import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';

import { ApplicationRef, Inject, NgModule, APP_BOOTSTRAP_LISTENER } from '@angular/core';
import { ServerModule, INITIAL_CONFIG } from '@angular/platform-server';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { Store } from '@ngrx/store';
import { Actions, EffectsModule } from '@ngrx/effects';

import { TranslateUniversalLoader } from '../platform/translate-universal-loader';

import { AppState } from './ngrx/app.reducer';

import { AuthAction, AuthActionType } from './auth/ngrx/auth.actions';

import { ServerTransferStateModule } from '../platform/transfer-state/server-transfer-state.module';
import { TransferState } from '../platform/transfer-state/transfer-state';

import { TransferStoreEffects } from '../platform/transfer-store/transfer-store.effects';
import { ServerTransferStoreEffects } from '../platform/transfer-store/server-transfer-store.effects';
import { ServerTransferStoreModule } from '../platform/transfer-store/server-transfer-store.module';

import { ServerCookiesModule } from '../platform/cookies/server-cookies.module';

import { ServerDataLoaderModule } from '../platform/data-loader/server-data-loader.module';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import { GLOBAL_CONFIG, ENV_CONFIG, GlobalConfig } from '../config';

export function boot(cache: TransferState, appRef: ApplicationRef, store: Store<AppState>, initialConfig: any, config: GlobalConfig) {
  if (initialConfig.cookie) {
    let authentication: any = {
      authenticated: true
    };
    let cookies: string[] = initialConfig.cookie.split(';');
    config.cookieNames.forEach((name: string) => {
      let index: number = 0;
      if (cookies.map((c: string) => c.trim()).some((cookie: string) => {
        const found: boolean = cookie.indexOf(name) === 0;
        if (found) {
          authentication[name] = cookie.split('=')[1];
        } else {
          index++;
        }
        return found;
      })) {
        cookies.splice(index, 1);
      } else {
        authentication.authenticated = false;
      }
    });
    if (authentication.authenticated) {
      store.dispatch(new AuthAction(AuthActionType.LOGIN, authentication));
    }
  }
  return () => {
    appRef.isStable.filter((stable: boolean) => stable).first().subscribe(() => {
      cache.inject();
    });
  };
}

export function getConfig() {
  return ENV_CONFIG;
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
    NgbModule.forRoot(),
    ServerModule,
    ServerCookiesModule,
    ServerDataLoaderModule,
    ServerTransferStateModule,
    ServerTransferStoreModule,
    EffectsModule.run(ServerTransferStoreEffects),
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
        ApplicationRef,
        Store,
        INITIAL_CONFIG,
        GLOBAL_CONFIG
      ]
    }
  ]
})
export class ServerAppModule {

}
