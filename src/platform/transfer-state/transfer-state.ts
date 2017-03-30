import { Injectable } from '@angular/core';

export abstract class TransferState {

  protected map = new Map<string, any>();

  keys() {
    return this.map.keys();
  }

  get(key: string): any {
    return this.map.get(key);
  }

  set(key: string, value: any): Map<string, any> {
    return this.map.set(key, value);
  }

  toJson(): any {
    const json: any = {};
    Array.from(this.keys())
      .forEach((key: string) => {
        json[key] = this.get(key);
      });
    return json;
  }

  abstract inject();

  abstract initialize();

}
