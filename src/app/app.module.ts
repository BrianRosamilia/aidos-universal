import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Store } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { RouterStoreModule } from '@ngrx/router-store';

import { TransferState } from '../platform/transfer-state/transfer-state';

import { AppState } from './store/app-state.store';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginModalComponent } from './auth/login/login-modal.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TransferHttpModule } from '../platform/transfer-http/transfer-http.module';

import { rootReducer } from './store/app-reducer.store';
import { HeaderEffects } from './header/ngrx/header.effects';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    HttpModule,
    TransferHttpModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, pathMatch: 'full' },
      { path: 'about', loadChildren: './+about/about.module#AboutModule' }
    ]),
    StoreModule.provideStore(rootReducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(HeaderEffects)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginModalComponent
  ],
  exports: [AppComponent],
  entryComponents: [LoginModalComponent]
})
export class AppModule {

  constructor(private cache: TransferState, private store: Store<AppState>) {
    console.log('Cache:', cache.toJson());
  }

}
