import { Injectable, EventEmitter } from '@angular/core';
import * as Loki from 'lokijs/src/lokijs';
import * as LokiIndexedAdapter from 'lokijs/src/loki-indexed-adapter';

  const DBCONFIG = {
    appName: 'iTWO4.0 Business Partner',
    dbName: 'iTWO40BusinessPartner',
    dbType: 'indexed',
    storeList: [
      'favorite'
    ]
  };


@Injectable()
export class dbService {
  private DB: any = new Loki();
  private coll: any = {};
  private readyDB: any = new EventEmitter();

  constructor() {
    this.initDB();
  }

  public initDB(): void {
    let idbAdapter = new LokiIndexedAdapter(DBCONFIG.appName);
    let option = {
      adapter: idbAdapter,
    };
    let db = new Loki(DBCONFIG.dbName, option);
    db.loadDatabase({}, () => {
      this.DB = db;
      console.log(db);
      this.initColl(DBCONFIG.storeList);
    });
  } 

  /**
   * init this collection object
   * @param list {Array} collection array
   */
  private initColl(list): void {
    list.forEach((store) => {
      let coll = this.DB.getCollection(store);
      if (coll === null) {
        coll = this.DB.addCollection(store);
      }
      this.coll[store] = coll;
    });
    this.readyDB.emit(true); 
  }

  /**
   * get the colletion data by collName
   * @param collName {string} collection name
   * @param isdesc {boolean} whether sort in descending order
   * @return coll data Array
   */
  public getDataByColl(collName: string, isdesc: boolean): any {
    let data = this.coll[collName].chain()
      .simplesort('order', isdesc)
      .data();
    return data;
  }

  /**
   * get data by key name and value
   * @param collName {string} collection name
   * @param name {string} key name
   * @param value {any} key value
   * @return list {Promise<any>} Array
   */
  public getDataByKey(collName: string, name: string, value: any): Promise<any> {
    let list = this.coll[collName].chain()
      .where((data) => {
        if(data[name] == value){
          return true;
        }else{
          let has:boolean = false;
          for(let key in data){
            if(data[key] && data[key][name] == value){
              has = true;
              break;
            } 
          }
          return has; 
        }
      })
      .data();
    return new Promise((resolve, reject) => {
      resolve(list);
    });
  }

  /**
   * add data
   * @param collName {string} collection name
   * @param data {Object} insert json
   * @return result {Promise<boolean>}
   */
  public addData(collName: string, data: any): Promise<boolean> {
    let result = this.coll[collName].insert(data);
    this.DB.saveDatabase();
    return new Promise((resolve, reject) => {
      if (result) {
        resolve(result);
      } else {
        reject(false);
      }
    });
  } 

  /**
   * update data by key name and key value
   * @param collName {string} collection name
   * @param id {number} $loki id
   * @param key {any} Object
   * @return result {Promise<boolean>}
   */
  public updateData(collName: string, id: number, key: any): Promise<boolean> {
    let data = this.coll[collName].get(id);
    key['$loki'] = data['$loki'];
    key.meta = data.meta;
    let result = this.coll[collName].update(key);
    this.DB.saveDatabase();
    return new Promise((resolve, reject) => {
      if (result) {
        resolve(result);
      } else {
        reject(0);
      }
    });
  }

    /**
   * remove data
   * @param collName {string} collection name
   * @param name {string} key name
   * @param value {any} key value
   * @return result {Promise<boolean>}
   */
  public delDataById(collName: string, id: any): Promise<boolean> {
    let result = this.coll[collName].remove(id);
    this.DB.saveDatabase();
    return new Promise((resolve, reject) => {
      if (result) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
