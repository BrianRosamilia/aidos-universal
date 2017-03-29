import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { WindowEffects } from './window/ngrx/window.effects';
import { AuthEffects } from './auth/ngrx/auth.effects';

import { AuthService } from './auth/auth.service';
import { DataService } from './data.service';

const MODULES = [
  EffectsModule.run(WindowEffects),
  EffectsModule.run(AuthEffects)
];

const COMPONENTS = [

];

const PROVIDERS = [
  AuthService,
  DataService
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
