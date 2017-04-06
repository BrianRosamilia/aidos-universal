import { Component, Inject } from '@angular/core';
import { Headers } from '@angular/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { AppState } from '../store/app-state.store';

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
  public access_token: string;

  constructor(private http: TransferHttp, private store: Store<AppState>, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    // tslint:disable-next-line:variable-name
    this.store.select((state: AppState) => state.auth.access_token).subscribe((access_token: string) => {
      this.access_token = access_token;
    });
  }

  userDetails(): void {
    if (this.access_token) {
      this.user = this.http.get(this.config.zuul.baseUrl + '/uaa/user-details', {
        headers: new Headers({
          'Authorization': ['Bearer', this.access_token].join(' '),
          'Content-Type': 'application/json'
        })
      }).map((data: any) => {
        return data;
      });
    }
  }

  greet() {
    if (this.access_token) {
      this.greetings = this.http.get(this.config.zuul.baseUrl + '/dam/greetings', {
        headers: new Headers({
          'Authorization': ['Bearer', this.access_token].join(' '),
          'Content-Type': 'application/json'
        })
      }).map((data: any) => {
        return data;
      });
    }
  }

  test() {
    this.results = this.http.get(this.config.zuul.baseUrl + '/dam/public/test').map((data: any) => {
      return data;
    });
  }

}
