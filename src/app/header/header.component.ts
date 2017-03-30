import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';

import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../store/app-state.store';

import { UserState } from '../auth/user/ngrx/user.reducer';

import { HeaderState } from './ngrx/header.reducer';
import { HeaderAction, HeaderActionType } from './ngrx/header.actions';

import { AuthService } from '../auth/auth.service';

import { LoginModalComponent } from '../auth/login/login-modal.component';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Component({
  selector: 'aidos-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  public headerState: Observable<HeaderState>;

  public userState: Observable<UserState>;

  constructor(private translate: TranslateService, private store: Store<AppState>, private modalService: NgbModal, private authService: AuthService, @Inject(GLOBAL_CONFIG) public config: GlobalConfig) {
    this.headerState = this.store.select((state: AppState) => state['header']);
    this.userState = this.store.select((state: AppState) => state['user']);
  }

  public toggleNavbar(): void {
    this.store.dispatch(new HeaderAction(HeaderActionType.TOGGLE));
  }

  public login(): void {
    const modalRef = this.modalService.open(LoginModalComponent);
  }

}
