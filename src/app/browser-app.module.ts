import { NgModule } from '@angular/core';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserTransferStateModule } from '../platform/transfer-state/browser-transfer-state.module';

import { DataLoader } from '../platform/data-loader/data.loader';
import { BrowserDataLoader } from '../platform/data-loader/browser-data.loader';
import { DataModule } from '../platform/data-loader/data.module';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import { GLOBAL_CONFIG, ENV_CONFIG } from '../config';

export function getConfig() {
  return ENV_CONFIG;
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
    DataModule.forRoot({
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
    { provide: GLOBAL_CONFIG, useFactory: (getConfig) }
  ]
})
export class BrowserAppModule {

}
