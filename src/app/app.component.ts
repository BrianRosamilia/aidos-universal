import { Component, HostListener, Inject, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { TransferState } from '../platform/transfer-state/transfer-state';

import { AppState } from './store/app-state.store';

import { WindowAction, WindowActionType } from './core/window/ngrx/window.actions';

import { GLOBAL_CONFIG, GlobalConfig } from '../config';

@Component({
  selector: 'aidos-app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./app.component.scss'],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private translate: TranslateService, private store: Store<AppState>, @Inject(GLOBAL_CONFIG) public config: GlobalConfig) {
    this.translate.setDefaultLang('en');
    this.translate.use('en');
  }

  @HostListener('window:resize', ['$event'])
  private onResize(event): void {
    this.store.dispatch(
      new WindowAction(WindowActionType.RESIZE, {
        width: event.target.innerWidth,
        height: event.target.innerHeight
      })
    );
  }

}
