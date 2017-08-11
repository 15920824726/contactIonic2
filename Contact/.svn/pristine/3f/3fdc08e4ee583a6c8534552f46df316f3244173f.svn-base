import { Injectable } from '@angular/core';
import { storageService } from '../../../core/providers/storage.service';
import { tokenService } from '../../../core/providers/token.service';
import { serverService } from '../../../core/providers/server.service';
import { httpService } from '../../../core/providers/http.service';
import { deviceService } from '../../../core/providers/device.service';

@Injectable()
export class userService {
	user: any;
	constructor(
		private sgService: storageService,
		private tokenService: tokenService,
		private httpService: httpService,
		private serverService: serverService,
		private dvService: deviceService
		){

	}

	getUser(): Promise<any> {
		let server = this.serverService.getServer().appServer;
		let url = server + '/services/login/getuserinfo';
		return new Promise((resolve,reject) => {
			this.httpService
			.get(url)
			.subscribe(res => {
				this.formatUser(res);
				resolve(this.user);
			},err => {
				console.log(err);
				reject({});
			});
		});
	}

	formatUser(user):void{
		this.user = user;
		this.user.photo = this.dvService.getIconData().avatar;	
	}

	saveLoginUser(user){
		let userInfo = {
			username: user.username,
			password: user.password,
			usernameLen: user.username.length,
			passwordLen: user.password.length
		};

		this.sgService.setItem('public','user',userInfo);
	}

	removeLoginUser(){
		this.sgService.removeItem('public','user');
	}

	login(username,password):Promise<any>{
		return new Promise((resolve,reject) => {
			this.tokenService.login(username,password).then((res) => {
				//this.setUser();
				resolve(res);
			},(error) => {
				reject(false);
			});
		});		
	}
	
}