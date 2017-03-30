import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '../store/app-state.store';

import { AuthAction, AuthActionType } from './ngrx/auth.actions';

import { TransferState } from '../../platform/transfer-state/transfer-state';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Injectable()
export class AuthService {

  constructor(private cache: TransferState, private store: Store<AppState>, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {

  }

}
