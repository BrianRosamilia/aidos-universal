import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AboutComponent } from './about.component';

@NgModule({
  declarations: [AboutComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: AboutComponent, pathMatch: 'full' }
    ])
  ]
})
export class AboutModule {

}
