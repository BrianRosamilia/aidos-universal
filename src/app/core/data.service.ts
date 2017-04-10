import { Inject, Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { DataLoader } from '../../platform/data-loader/data-loader';

import { TransferState } from '../../platform/transfer-state/transfer-state';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Injectable()
export class DataService {

  private observableDataMap: Map<string, Observable<any>>;

  private cacheKey: string = 'DATA';

  private dataSubjects: Map<string, BehaviorSubject<any>>;

  constructor(private cache: TransferState, private dataLoader: DataLoader, @Inject(GLOBAL_CONFIG) private config: GlobalConfig) {
    this.dataSubjects = new Map<string, BehaviorSubject<any>>();
    this.observableDataMap = new Map<string, Observable<any>>();
    for (let name of this.config.data) {
      let dataSubject: BehaviorSubject<any> = <BehaviorSubject<any>>new BehaviorSubject(new Array<any>());
      let observableData: Observable<any> = dataSubject.asObservable();
      this.dataSubjects.set(name, dataSubject);
      this.observableDataMap.set(name, observableData);
      let cachedData: any = this.cache.get(this.dataCacheKey(name));
      if (cachedData) {
        dataSubject.next(cachedData);
      } else {
        this.dataLoader.getData(name).subscribe((json: any) => {
          this.cache.set(this.dataCacheKey(name), json);
          dataSubject.next(json);
        });
      }
    }
  }

  public getObservableData(name: string): Observable<any> {
    return this.observableDataMap.get(name);
  }

  private dataCacheKey(name: string): string {
    return [this.cacheKey, '-', name].join('');
  }

}
