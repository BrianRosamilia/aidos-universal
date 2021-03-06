import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { TransferHttpModule } from '../platform/transfer-http/transfer-http.module';

import { appReducer } from './ngrx/app.reducer';
import { AppEffects } from './ngrx/app.effects';
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
      { path: 'about', loadChildren: './+about/about.module#AboutModule' },
      { path: 'login', loadChildren: './+login/login.module#LoginModule' }
    ]),
    StoreModule.provideStore(appReducer),
    RouterStoreModule.connectRouter(),
    EffectsModule.run(AppEffects),
    EffectsModule.run(HeaderEffects)
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent
  ],
  exports: [AppComponent]
})
export class AppModule {

}
