import { Injectable } from '@angular/core';

@Injectable()
export class storageService {

  constructor() {}

  private getStore(type: string): any{
  	return type === 'private' ? sessionStorage : localStorage;
  }

  public setItem(type: string, key: string, data: any):boolean {
    if(!data){
      return;
    } else {
      let store = this.getStore(type);
      if(typeof data === 'object') {
        data = JSON.stringify(data);
      }
      store.setItem(key, data);
      return false;
    }
  }

  public getItem(type: string, key: string): any {
    let store = this.getStore(type);
    let data = store.getItem(key);
    if(typeof data === 'string' && data.indexOf('{') >=0 ) {
      data = JSON.parse(data);
    }
    if(data) {
      return data;
    } else {
      return null;
    }
  }

  public removeItem(type: string, key: string): void {
    let store = this.getStore(type);
    store.removeItem(key);
  }

  public clearAllStore(type: string): void {
    let store = this.getStore(type);
    store.clear();
  }
}