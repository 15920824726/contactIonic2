import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

import { toastService } from './toast.service';
import { Broadcaster } from './broadcaster.service';
import { storageService } from './storage.service';
import { deviceService } from './device.service';

@Injectable()
export class httpService {
	private headers: any;
	private loader: any;
	private translation: any;

	constructor(
		private http: Http,
		private loadingCtrl: LoadingController,
		private tlService: TranslateService,
		private tsService: toastService,
		private broadcaster: Broadcaster,
		private sgService: storageService,
		private dvService: deviceService){
		this.init();
	}

	private init():void {
		this.headers = new Headers();
		let context:any = this.sgService.getItem('public','clientContext');
		if(!context){
			context = {
				"signedInClientId": '0',
				"clientId": '0',
				"permissionClientId": '0',
				"permissionRoleId": '0',
				"companyCode": ''
			};
		}

		this.set("Client-Context",JSON.stringify(context));	
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data.http);
		});	
	}

	private langScope(http): void{
		this.translation = {
			tokenMissing: http.tokenMissing,
			serverFail: http.serverConnectFail
		}
	}

	public set(name:string,value:any):void {
		this.headers.set(name,value);
	}
	
	public del(name:string):void {
		this.headers.delete(name);
	}

	public getHeaders(): any{
		return this.headers;
	}

	public getOption(): any{
		return new RequestOptions({headers: this.headers});
	}

	public get(url:string, search?:any,showLoading:boolean = true): any{
		let reqOpts = this.getOption();
		reqOpts = Object.assign(reqOpts,{method: 'get'});
		if(search){
			reqOpts = Object.assign(reqOpts,{search:search});
		}		
		return this.request(url,reqOpts,showLoading);
	}

	public post(url:string, bodys?:any,showLoading:boolean = true): any{
		let reqOpts = this.getOption();
		reqOpts = Object.assign(reqOpts,{method: 'post'});
		if(bodys){		
			reqOpts = Object.assign(reqOpts,{body: bodys});
		}
		return this.request(url,reqOpts,showLoading);
	}

	private request(url:string, reqOpts?:RequestOptions,showLoading:boolean = true):Observable<Response> {
    if(!this.loader){
      this.loader = this.loadingCtrl.create({});
      this.loader.present();
    }

		return this.http
      .request(url,new RequestOptions(reqOpts))
      .do(res => {
        if(this.loader&&showLoading){
          this.loader.dismiss();
          this.loader = null;
        }
      })
      .map(this.preprocessRes.bind(this))
      .catch(this.handleErr.bind(this));
	}

	private preprocessRes(res): boolean{
		if(res._body == ''){
			return false;
		}
		if(res && !!res._body){				
			res = res.json();
			return res;
		}					
	}

	private handleErr(error: any): any{
		if(this.loader){
			this.loader.dismiss();
			this.loader = null;
		}
		if(error.status && error.status > 200){
			if (error.status === 401) {
				this.broadcaster.broadcast('serverInvalid',{});
			}
			else if (error.status === 405) {
				this.broadcaster.broadcast('serverInvalid',{});
			}else if(error.status === 404){
				this.broadcaster.broadcast('serverInvalid',{});
			}else{
        this.broadcaster.broadcast('serverInvalid',{});
      }
		}
		let errMsg: string;
		if(error instanceof Response){
			const body = error.json() || '';
			const err  = JSON.stringify(body);
			errMsg = `${error.status } - ${error.statusText|| ''} ${err}`;
		}else{
			errMsg = error.message ? error.message : error.toString();
		}

		this.tsService.error(errMsg);
		return Observable.throw(errMsg);		
	}

	public getImgData(url,options): Promise<string>{
		return new Promise((resolve,reject) => {
			this.post(url,options)
				.subscribe(res => {	
					this.handleImg(res)
						.then(img => {
							resolve(img);
						},err => {
							reject(err);
						});					
				},err => {
	
				});
		});
	}

	public handleImg(img): Promise<string>{
		return new Promise((resolve,reject) => {
			if(img && img.photo){
				img.photo = `data:image/png;base64,${img.photo}`;								
	            resolve(img);						
	        }else{
	        	let iconData:any = this.dvService.getIconData();
	        	if(iconData){
	        		let newPhoto = {
	        			photo: iconData.avatar
	        		}
	        		resolve(newPhoto); 
	        	}else{
	        		reject('');
	        	} 	        	
	        }
		});	
	}

	public creatPromise(url,option,showLoading:boolean = true): Promise<any>{
		return new Promise((resolve,reject) => {
			this.post(url,option,showLoading)
				.subscribe(res => {
					resolve(res);
				},err => {
					reject(err);
				});
		});
	}
}