import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { NgModule, ApplicationRef, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ServerTransferStateModule } from '../platform/transfer-state/server-transfer-state.module';
import { TransferState } from '../platform/transfer-state/transfer-state';

import { TranslateUniversalLoader } from '../platform/translate-universal-loader';
import { DataLoader } from '../platform/data-loader/data.loader';
import { ServerDataLoader } from '../platform/data-loader/server-data.loader';
import { DataModule } from '../platform/data-loader/data.module';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import { GLOBAL_CONFIG, ENV_CONFIG } from '../config';

export function boot(state: TransferState, applicationRef: ApplicationRef) {
  return () => {
    applicationRef.isStable
      .filter((stable: boolean) => stable)
      .first()
      .subscribe(() => {
        state.inject();
      });
  };
}

export function getConfig() {
  return ENV_CONFIG;
}

export function createDataLoader() {
  return new ServerDataLoader('dist/assets/data', '.json');
}

export function UniversalLoaderFactory() {
  return new TranslateUniversalLoader('dist/assets/i18n', '.json');
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
        useFactory: UniversalLoaderFactory,
        deps: []
      }
    }),
    DataModule.forRoot({
      provide: DataLoader,
      useFactory: (createDataLoader),
      deps: []
    }),
    NgbModule.forRoot(),
    ServerModule,
    ServerTransferStateModule,
    NoopAnimationsModule,
    AppModule
  ],
  providers: [
    { provide: GLOBAL_CONFIG, useFactory: (getConfig) },
    {
      provide: APP_BOOTSTRAP_LISTENER,
      multi: true,
      useFactory: boot,
      deps: [
        TransferState,
        ApplicationRef
      ]
    }
  ]
})
export class ServerAppModule {

}
