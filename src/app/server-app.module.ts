import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { NgModule, ApplicationRef, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Actions } from '@ngrx/effects';

import { TranslateUniversalLoader } from '../platform/translate-universal-loader';

import { ServerTransferStateModule } from '../platform/transfer-state/server-transfer-state.module';
import { TransferState } from '../platform/transfer-state/transfer-state';

import { TransferStoreEffects } from '../platform/transfer-store/transfer-store.effects';
import { ServerTransferStoreEffects } from '../platform/transfer-store/server-transfer-store.effects';
import { TransferStoreModule } from '../platform/transfer-store/transfer-store.module';

import { DataLoader } from '../platform/data-loader/data-loader';
import { ServerDataLoader } from '../platform/data-loader/server-data-loader';
import { DataLoaderModule } from '../platform/data-loader/data-loader.module';

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

export function createTransferStoreEffects(actions: Actions, cache: TransferState) {
  return new ServerTransferStoreEffects(actions, cache);
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
    TransferStoreModule.forRoot({
      provide: TransferStoreEffects,
      useFactory: (createTransferStoreEffects),
      deps: [
        Actions,
        TransferState
      ]
    }),
    DataLoaderModule.forRoot({
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
