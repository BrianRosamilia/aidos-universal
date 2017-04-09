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

  // tslint:disable-next-line:variable-name
  public access_token: Observable<string>;

  private accessToken: string;

  constructor(private http: TransferHttp, private store: Store<AppState>, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    // tslint:disable-next-line:variable-name
    this.access_token = this.store.select((state: AppState) => state.auth.access_token);

    this.access_token.subscribe((accessToken: string) => {
      this.accessToken = accessToken;
    });
  }

  userDetails(): void {
    // temporary
    this.user = this.http.get(this.config.zuul.baseUrl + '/uaa/user-details', {
      headers: new Headers({
        'Authorization': ['Bearer', this.accessToken].join(' '),
        'Content-Type': 'application/json'
      })
    }).map((data: any) => {
      return data;
    });
  }

  greet() {
    // temporary
    this.greetings = this.http.get(this.config.zuul.baseUrl + '/dam/greetings', {
      headers: new Headers({
        'Authorization': ['Bearer', this.accessToken].join(' '),
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
