import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: '', component: AboutComponent, pathMatch: 'full' }
    ])
  ]
})
export class AboutModule {

}
