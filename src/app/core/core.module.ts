import { NgModule } from '@angular/core';

import { EffectsModule } from '@ngrx/effects';

import { WindowEffects } from './window/ngrx/window.effects';
import { AuthEffects } from '../auth/ngrx/auth.effects';
import { UserEffects } from '../auth/user/ngrx/user.effects';
import { TransferStoreEffects } from '../../platform/transfer-store/transfer-store.effects';

import { AuthService } from '../auth/auth.service';
import { DataService } from './data.service';

const MODULES = [
  EffectsModule.run(WindowEffects),
  EffectsModule.run(AuthEffects),
  EffectsModule.run(UserEffects),
  EffectsModule.run(<any>TransferStoreEffects)
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
