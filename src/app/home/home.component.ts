import { Component } from '@angular/core';
import { TransferHttp } from '../../platform/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'aidos-home',
  styleUrls: ['home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  public user: Observable<any>;

  public greetings: Observable<any>;

  public data: Observable<any>;

  constructor(private http: TransferHttp) {

  }

  userDetails(): void {
    this.user = this.http.get('https://localhost:8765/uaa/user-details', { withCredentials: true }).map((data: any) => {
      return data;
    });
  }

  greet() {
    this.greetings = this.http.get('https://localhost:8765/dam/greetings', { withCredentials: true }).map((data: any) => {
      return data;
    });
  }

  test() {
    this.data = this.http.get('https://localhost:8765/dam/public/test').map((data: any) => {
      return data;
    });
  }

}
