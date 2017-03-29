import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { WindowEffects } from './window/ngrx/window.effects';

import { DataService } from './data.service';

const MODULES = [
  EffectsModule.run(WindowEffects)
];

const COMPONENTS = [

];

const PROVIDERS = [
  DataService,
];

@NgModule({
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS
  ],
  declarations: [
    ...COMPONENTS
  ],
  providers: [
    ...PROVIDERS
  ]
})
export class CoreModule { }
