import { Component, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../ngrx/app.reducer';

import { TransferHttp } from '../../platform/transfer-http/transfer-http';

import { AuthState } from '../auth/ngrx/auth.reducer';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Component({
  selector: 'aidos-home',
  styleUrls: ['home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public user: Observable<any>;

  public greetings: Observable<any>;

  public results: Observable<any>;

  constructor(private http: TransferHttp, private store: Store<AppState>, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.store.select((state: AppState) => state.auth.access_token).subscribe((accessToken: string) => {
      if (accessToken !== undefined) {
        this.userDetails(accessToken);
        this.greet(accessToken);
      }
      else {
        delete this.user;
        delete this.greetings;
      }
    });
    this.test();
  }

  userDetails(accessToken: string): void {
    // temporary
    this.user = this.http.get(this.config.zuul.baseUrl + '/uaa/user-details', {
      headers: new Headers({
        'Authorization': ['Bearer', accessToken].join(' '),
        'Content-Type': 'application/json'
      })
    }).map((data: any) => {
      return data;
    });
  }

  greet(accessToken: string) {
    // temporary
    this.greetings = this.http.get(this.config.zuul.baseUrl + '/dam/greetings', {
      headers: new Headers({
        'Authorization': ['Bearer', accessToken].join(' '),
        'Content-Type': 'application/json'
      })
    }).map((data: any) => {
      return data;
    });
  }

  test() {
    this.results = this.http.get(this.config.zuul.baseUrl + '/dam/public/test').map((data: any) => {
      return data;
    });
  }

}
