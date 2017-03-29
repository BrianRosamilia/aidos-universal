import 'zone.js/dist/zone';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { BrowserAppModule } from './app/browser-app.module';

import { ENV_CONFIG } from './config';

if (ENV_CONFIG.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(BrowserAppModule);
