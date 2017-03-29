import 'zone.js/dist/zone';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BrowserAppModuleNgFactory } from './ngfactory/app/browser-app.module.ngfactory';

import { ENV_CONFIG } from './config';

if (ENV_CONFIG.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModuleFactory(BrowserAppModuleNgFactory);
