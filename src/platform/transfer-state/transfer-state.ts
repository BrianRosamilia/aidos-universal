import { Injectable } from '@angular/core';

@Injectable()
export class TransferState {

  private _map = new Map<string, any>();

  keys() {
    return this._map.keys();
  }

  get(key: string): any {
    return this._map.get(key);
  }

  set(key: string, value: any): Map<string, any> {
    return this._map.set(key, value);
  }

  toJson(): any {
    const obj = {};
    Array.from(this.keys())
      .forEach((key: string) => {
        obj[key] = this.get(key);
      });
    return obj;
  }

  initialize(obj: any): void {
    Object.keys(obj)
      .forEach((key: string) => {
        this.set(key, obj[key]);
      });
  }

  inject(): void {
    console.log('inject does nothing');
  }

}
