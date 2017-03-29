import { Observable } from 'rxjs/Observable';
import * as fs from 'fs';

import { DataLoader } from './data.loader';

export class ServerDataLoader extends DataLoader {

  constructor(private prefix: string = 'data', private suffix: string = '.json') {
    super();
  }

  public getData(name: string): Observable<any> {
    return Observable.create((observer: any) => {
      observer.next(JSON.parse(fs.readFileSync(`${this.prefix}/${this.language}/${name}${this.suffix}`, 'utf8')));
      observer.complete();
    });
  }

}
