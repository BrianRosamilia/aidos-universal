import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Actions } from '@ngrx/effects';

import { BrowserTransferStateModule } from '../platform/transfer-state/browser-transfer-state.module';

import { TransferStoreEffects } from '../platform/transfer-store/transfer-store.effects';
import { BrowserTransferStoreEffects } from '../platform/transfer-store/browser-transfer-store.effects';
import { TransferStoreModule } from '../platform/transfer-store/transfer-store.module';

import { DataLoader } from '../platform/data-loader/data-loader';
import { BrowserDataLoader } from '../platform/data-loader/browser-data-loader';
import { DataLoaderModule } from '../platform/data-loader/data-loader.module';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import { GLOBAL_CONFIG, ENV_CONFIG } from '../config';

export function getConfig() {
  return ENV_CONFIG;
}

export function createTransferStoreEffects(actions: Actions) {
  return new BrowserTransferStoreEffects(actions);
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
    DataLoaderModule.forRoot({
      provide: DataLoader,
      useFactory: (createDataLoader),
      deps: [Http]
    }),
    TransferStoreModule.forRoot({
      provide: TransferStoreEffects,
      useFactory: (createTransferStoreEffects),
      deps: [Actions]
    }),
    NgbModule.forRoot(),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AppModule
  ],
  providers: [
    { provide: GLOBAL_CONFIG, useFactory: (getConfig) }
  ]
})
export class BrowserAppModule {

}
