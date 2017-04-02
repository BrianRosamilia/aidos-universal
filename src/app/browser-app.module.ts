import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Actions } from '@ngrx/effects';

import { BrowserTransferStateModule } from '../platform/transfer-state/browser-transfer-state.module';
import { TransferState } from '../platform/transfer-state/transfer-state';

import { TransferStoreEffects } from '../platform/transfer-store/transfer-store.effects';
import { BrowserTransferStoreEffects } from '../platform/transfer-store/browser-transfer-store.effects';
import { TransferStoreModule } from '../platform/transfer-store/transfer-store.module';

import { Cookies } from '../platform/cookies/cookies';
import { BrowserCookies } from '../platform/cookies/browser-cookies';
import { CookiesModule } from '../platform/cookies/cookies.module';

import { DataLoader } from '../platform/data-loader/data-loader';
import { BrowserDataLoader } from '../platform/data-loader/browser-data-loader';
import { DataLoaderModule } from '../platform/data-loader/data-loader.module';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import { GLOBAL_CONFIG, ENV_CONFIG } from '../config';

export function init(cache: TransferState) {
  return () => {
    cache.initialize();
  };
}

export function getConfig() {
  return ENV_CONFIG;
}

export function createTransferStoreEffects(actions: Actions) {
  return new BrowserTransferStoreEffects(actions);
}

export function createCookies() {
  return new BrowserCookies();
}

export function createDataLoader(http: Http) {
  return new BrowserDataLoader(http, 'assets/data', '.json');
}

export function HttpLoaderFactory(http: Http) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}

@NgModule({
  bootstrap: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({
      appId: 'aidos-app-id'
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [Http]
      }
    }),
    TransferStoreModule.forRoot({
      provide: TransferStoreEffects,
      useFactory: (createTransferStoreEffects),
      deps: [Actions]
    }),
    CookiesModule.forRoot({
      provide: Cookies,
      useFactory: (createCookies),
      deps: []
    }),
    DataLoaderModule.forRoot({
      provide: DataLoader,
      useFactory: (createDataLoader),
      deps: [Http]
    }),
    NgbModule.forRoot(),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppModule
  ],
  providers: [
    { provide: GLOBAL_CONFIG, useFactory: (getConfig) },
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: init,
      deps: [
        TransferState
      ]
    }
  ]
})
export class BrowserAppModule {

}
