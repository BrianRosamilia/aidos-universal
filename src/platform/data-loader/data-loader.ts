import { Observable } from 'rxjs/Observable';

export abstract class DataLoader {

  protected language: string;

  protected prefix: string;

  protected suffix: string;

  constructor() {
    this.language = 'en';
    this.prefix = 'data';
    this.suffix = '.json';
  }

  public setLanguage(language: string): void {
    this.language = language;
  }

  abstract getData(name: string): Observable<any>;

}
