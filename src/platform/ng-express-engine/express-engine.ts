import * as fs from 'fs';

import { Request, Response, Send } from 'express';

import { Provider, NgModuleFactory, InjectionToken, Type, CompilerFactory, Compiler } from '@angular/core';
import { INITIAL_CONFIG, renderModuleFactory, platformDynamicServer } from '@angular/platform-server';

import { ResourceLoader } from '@angular/compiler';

import { FileLoader } from './file-loader';

export const REQUEST = new InjectionToken<Request>('REQUEST');
export const RESPONSE = new InjectionToken<Response>('RESPONSE');

export interface NgSetupOptions {
  bootstrap: Type<{}> | NgModuleFactory<{}>;
  providers?: Provider[];
}

export interface RenderOptions extends NgSetupOptions {
  req: Request;
  res?: Response;
}

const templateCache: { [key: string]: string } = {};

const factoryCacheMap = new Map<Type<{}>, NgModuleFactory<{}>>();

export function ngExpressEngine(setupOptions: NgSetupOptions) {
  const compilerFactory: CompilerFactory = platformDynamicServer().injector.get(CompilerFactory);
  const compiler: Compiler = compilerFactory.createCompiler([{
    providers: [
      { provide: ResourceLoader, useClass: FileLoader }
    ]
  }]);

  setupOptions.providers = setupOptions.providers || [];

  return (filePath: string, options: RenderOptions, callback: Send) => {
    options.providers = options.providers || [];

    try {
      const moduleOrFactory = options.bootstrap || setupOptions.bootstrap;

      if (!moduleOrFactory) {
        throw new Error('You must pass in a NgModule or NgModuleFactory to be bootstrapped');
      }

      const extraProviders = setupOptions.providers.concat(
        options.providers,
        getReqResProviders(options.req, options.res), [{
          provide: INITIAL_CONFIG,
          useValue: {
            document: getDocument(filePath),
            url: options.req.originalUrl,
            cookie: options.req.headers.cookie
          }
        }
        ]);

      getFactory(moduleOrFactory, compiler)
        .then((factory: NgModuleFactory<{}>) => {
          return renderModuleFactory(factory, {
            extraProviders: extraProviders
          });
        })
        .then((html: string) => {
          callback(null, html);
        }, (err) => {
          callback(err);
          throw err;
        });
    } catch (err) {
      callback(err);
    }
  };
}

function getFactory(moduleOrFactory: Type<{}> | NgModuleFactory<{}>, compiler: Compiler): Promise<NgModuleFactory<{}>> {
  return new Promise<NgModuleFactory<{}>>((resolve, reject) => {
    if (moduleOrFactory instanceof NgModuleFactory) {
      resolve(moduleOrFactory);
      return;
    } else {
      const moduleFactory = factoryCacheMap.get(moduleOrFactory);

      if (moduleFactory) {
        resolve(moduleFactory);
        return;
      }

      compiler.compileModuleAsync(moduleOrFactory)
        .then((factory: NgModuleFactory<{}>) => {
          factoryCacheMap.set(moduleOrFactory, factory);
          resolve(factory);
        }, ((err: any) => {
          reject(err);
        }));
    }
  });
}

function getReqResProviders(req: Request, res: Response): Provider[] {
  const providers: Provider[] = [{
    provide: REQUEST,
    useValue: req
  }];
  if (res) {
    providers.push({
      provide: RESPONSE,
      useValue: res
    });
  }
  return providers;
}

function getDocument(filePath: string): string {
  return templateCache[filePath] = templateCache[filePath] || fs.readFileSync(filePath).toString();
}
