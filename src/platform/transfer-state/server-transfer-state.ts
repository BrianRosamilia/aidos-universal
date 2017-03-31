import { Inject, Injectable, RendererFactory2, ViewEncapsulation } from '@angular/core';

import { INITIAL_CONFIG, PlatformState } from '@angular/platform-server';

import { Store } from '@ngrx/store';

import { TransferState } from './transfer-state';

import { AppState } from '../../app/store/app-state.store';

import { AuthAction, AuthActionType } from '../../app/auth/ngrx/auth.actions';

@Injectable()
export class ServerTransferState extends TransferState {

  constructor(private state: PlatformState, private rendererFactory: RendererFactory2) {
    super();
  }

  inject() {

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
