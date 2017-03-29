import { Component, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../store/app-state.store';

import { HeaderState } from './ngrx/header.reducer';
import { HeaderAction, HeaderActionType } from './ngrx/header.actions';

@Component({
  selector: 'aidos-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  public navbarCollapsed: Observable<boolean>;

  constructor(private translate: TranslateService, private store: Store<AppState>) {
    this.navbarCollapsed = this.store.select((state: AppState) => state['header'].navbarCollapsed);
  }

  public toggleNavbar(): void {
    this.store.dispatch(new HeaderAction(HeaderActionType.TOGGLE));
  }

}
