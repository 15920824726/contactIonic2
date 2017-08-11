import { Injectable } from '@angular/core';

import { httpService } from '../../../core/providers/http.service';
import { serverService } from '../../../core/providers/server.service';

@Injectable()
export class mapService {
	constructor(		
		private httpService: httpService,
		private serverService: serverService){
		
	}

	public getMapKey():Promise<any>{
		let appServer = this.serverService.getServer().appServer;
		let url = `${appServer}/basics/common/systemoption/map`;
		return new Promise((resolve,reject) => {
			this.httpService
			.get(url)
			.subscribe(res => {
				resolve(res);
			}, err => {
				console.error(err);
				reject(null);
			});
		});
	}
}