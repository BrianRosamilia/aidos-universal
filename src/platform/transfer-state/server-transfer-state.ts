import { Inject, Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';

import { INITIAL_CONFIG, PlatformState } from '@angular/platform-server';

import { Store } from '@ngrx/store';

import { TransferState } from './transfer-state';

import { AppState } from '../../app/store/app-state.store';

import { AuthAction, AuthActionType } from '../../app/auth/ngrx/auth.actions';

@Injectable()
export class ServerTransferState extends TransferState {

  constructor(private state: PlatformState, private rendererFactory: RendererFactory2, private store: Store<AppState>, @Inject(INITIAL_CONFIG) private config: any) {
    super();
  }

  initialize() {
    console.log('Server transfer initialize.');
  }

  inject() {

    console.log('Server transfer inject.');

    // check cookies for JSESSIONID, perform AuthAction LOGIN
    if (this.config.cookie) {
      const cookies: string[] = this.config.cookie.split(';');
      for (let i in cookies) {
        if (cookies[i].trim().indexOf('JSESSIONID') === 0) {
          this.store.dispatch(new AuthAction(AuthActionType.LOGIN, {
            sessionId: cookies[i].trim().split('=')[1],
            authenticated: true
          }));
        }
      }
    }

    // put the store state in the Universal cache
    try {

      const document: any = this.state.getDocument();

      const transferStateString = JSON.stringify(this.toJson());

      const renderer = this.rendererFactory.createRenderer(document, {
        id: '-1',
        encapsulation: ViewEncapsulation.None,
        styles: [],
        data: {}
      });

      const head = document.children[1].children[0];
      if (head.name !== 'head') {
        throw new Error('Please have <head> as the first element in your document');
      }

      const script = renderer.createElement('script');
      renderer.setValue(script, `window['TRANSFER_STATE'] = ${transferStateString}`);
      renderer.appendChild(head, script);
    } catch (e) {
      console.error(e);
    }

  }

}
