import { NgModule, APP_INITIALIZER } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EffectsModule } from '@ngrx/effects';

import { TransferState } from '../platform/transfer-state/transfer-state';
import { BrowserTransferStateModule } from '../platform/transfer-state/browser-transfer-state.module';

import { BrowserTransferStoreEffects } from '../platform/transfer-store/browser-transfer-store.effects';
import { BrowserTransferStoreModule } from '../platform/transfer-store/browser-transfer-store.module';

import { BrowserCookiesModule } from '../platform/cookies/browser-cookies.module';
import { BrowserDataLoaderModule } from '../platform/data-loader/browser-data-loader.module';

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
    NgbModule.forRoot(),
    BrowserCookiesModule,
    BrowserDataLoaderModule,
    BrowserTransferStateModule,
    BrowserTransferStoreModule,
    EffectsModule.run(BrowserTransferStoreEffects),
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
