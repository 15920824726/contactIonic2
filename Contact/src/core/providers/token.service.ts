import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';

import { httpService } from './http.service';
import { serverService } from './server.service';
import { storageService } from './storage.service';

@Injectable()
export class tokenService {
	private baseUrl: string;
	private url: string;
	private authNtoken: string = 'tt:authentication:authNToken';
	private key: string;

	constructor(
		private httpService: httpService,
		private serverService: serverService,
		private sgService: storageService) {
		this.init();
	}

	private init():void{
		let server   = this.serverService.getServer();
		this.url     = server.identityServer;
		this.baseUrl = server.appServer;
		this.key     = this.baseUrl + this.authNtoken;
	}

	private setToken(tokenData): void{
		if (!tokenData.expiration) {
            //  getTime() returns the number of milliseconds since 1970/01/01
            // tokenData.expires_in hold the expiration time in seconds, i.e. 604800 are 7 days
            // 10 minutes before it really expires we request a new token
            //var expiration = tokenData.timestamp + 604800000;
            //tokenData.expiration = expiration;
            let expiration = new Date().getTime() + (tokenData.expires_in - 600) * 1000;
            tokenData.expiration = expiration;
        }
        let sessionTokenValue = 'Bearer ' + tokenData.access_token;
		this.httpService.set('Authorization',sessionTokenValue);
		this.httpService.del('Content-Type');
		this.sgService.setItem('public',this.key,tokenData);
	}

	private getToken():Promise<any>{
		return new Promise((resolve, reject) => {
			let tk = this.sgService.getItem('public',this.key);
			if(tk){
				resolve(tk);
			}else{
				reject(false);
			}
		});
	}

	private clearToken(): void{
		this.sgService.removeItem('public',this.key);
		this.httpService.del('Atuthorization');		
	}

	public login(username:string,password:string):Promise<any>{
		this.httpService.set("Content-Type","application/x-www-form-urlencoded");

		let params = new URLSearchParams();		
		params.set('grant_type','password');
		params.set('username',username);
		params.set('password',password);
		params.set('client_id','iTWO.Cloud');
		params.set('client_secret','{fec4c1a6-8182-4136-a1d4-81ad1af5db4a}');
		params.set('scope','default');

		let url = this.url + '/core/connect/token';

		return new Promise ((resolve,reject) => {
					this.httpService
						.post(url,params)
						.subscribe(res => {
							this.setToken(res);
							resolve(res);
						},err => {
							reject(err);
						});
		});
	}

	public logout(): void{
		this.sgService.clearAllStore('public');
		this.sgService.clearAllStore('private');
		this.clearToken();
	}	

	public modifyServer(server): void{
		this.url = server.identityServer; 
		this.baseUrl = server.appServer;
		this.key = this.baseUrl + this.authNtoken;
	}

	public checkForValidToken(): Promise<any> {
		return this.getToken().then((tkData) => {
			if(!tkData){
				return false;
			}else{
				if(new Date().getTime() > tkData.expiration){
					return false;
				}else{
					this.setToken(tkData);
					return true;
				}
			}
		});
	}
}