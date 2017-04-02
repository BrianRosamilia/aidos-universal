import { Inject, Injectable } from '@angular/core';
import { Headers, RequestOptionsArgs, Response, URLSearchParams } from '@angular/http';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';

import { TransferHttp } from '../../platform/transfer-http/transfer-http';

import { Cookies } from '../../platform/cookies/cookies';

import { AppState } from '../store/app-state.store';

import { AuthAction, AuthActionType } from './ngrx/auth.actions';
import { AuthState } from './ngrx/auth.reducer';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Injectable()
export class AuthService {

  constructor(private http: TransferHttp, private cookies: Cookies, private store: Store<AppState>, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {

  }

  public login(loginData: any): Promise<boolean> {
    return new Promise((resolve) => {
      let data = new URLSearchParams();
      data.append('grant_type', 'password');
      data.append('username', loginData.username);
      data.append('password', loginData.password);
      const options: RequestOptionsArgs = {
        headers: new Headers({
          // tslint:disable-next-line:object-literal-key-quotes
          'Authorization': ['Basic', this.config.authorizationKey].join(' ')
        })
      };
      this.http.post(this.config.zuul.baseUrl + '/uaa/oauth/login', data, options).subscribe((response: any) => {
        this.setAuthCookies(response).then((cookiesSet: boolean) => {
          if (cookiesSet) {
            this.store.dispatch(new AuthAction(AuthActionType.LOGIN, response));
            resolve(true);
          } else {
            resolve(false);
            console.warn('Unable to set authentication cookies!');
          }
        });
      });
    });
  }

  public user(payload: any): Observable<Response> {
    return this.http.get(this.config.zuul.baseUrl + '/uaa/user-details', {
      headers: new Headers({
        // tslint:disable-next-line:object-literal-key-quotes
        'Authorization': ['Bearer', payload.access_token].join(' ')
      })
    });
  }

  private setAuthCookies(response: any): Promise<boolean> {
    return new Promise((resolve) => {
      // TODO: improve
      const responseKeys: string[] = Object.keys(response);
      for (const key of responseKeys) {
        this.cookies.set(key, response[key], 1);
      }
      resolve(true);
    });
  }

}
