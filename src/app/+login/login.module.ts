import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: LoginComponent, pathMatch: 'full' }
    ])
  ]
})
export class LoginModule {

}
