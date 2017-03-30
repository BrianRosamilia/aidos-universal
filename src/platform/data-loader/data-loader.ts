import { Observable } from 'rxjs/Observable';

export abstract class DataLoader {

  protected language: string = 'en';

  public setLanguage(language: string): void {
    this.language = language;
  }

  abstract getData(name: string): Observable<any>;

}
