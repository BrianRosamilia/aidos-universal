import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../store/app-state.store';

import { UserState } from '../auth/user/ngrx/user.reducer';

import { HeaderState } from './ngrx/header.reducer';
import { HeaderAction, HeaderActionType } from './ngrx/header.actions';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'aidos-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  public headerState: Observable<HeaderState>;

  public userState: Observable<UserState>;

  constructor(private translate: TranslateService, private store: Store<AppState>, private authService: AuthService) {
    this.headerState = this.store.select((state: AppState) => state.header);
    this.userState = this.store.select((state: AppState) => state.user);
  }

  public toggleNavbar(): void {
    this.store.dispatch(new HeaderAction(HeaderActionType.TOGGLE));
  }

  public logout(): void {
    this.authService.logout();
  }

}
