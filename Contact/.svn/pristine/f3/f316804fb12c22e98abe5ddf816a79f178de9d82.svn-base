import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { httpService } from '../../../core/providers/http.service';
import { serverService } from '../../../core/providers/server.service';
import { highlightKeyService } from '../share/highlight.key.service';

@Injectable()
export class partnerService {
	pro: any;
	projectPartners: any;
	prveProjectId: number;
	constructor(
		private http: Http,
		private httpService: httpService,
		private serverService: serverService,
		private highlightKeyService:highlightKeyService) {
		
	}

	public getBpSummaryItems(options): Promise<any> {
		let server = this.serverService.getUrl();
		let url = `${server}getBpSummaryItems`;
		return this.httpService.creatPromise(url,options);
	}

	public getPartnerById(options): Promise<any> {
		let server = this.serverService.getUrl();
		let url = `${server}getBpDetailById`;
		return this.httpService.creatPromise(url,options);
	}

	private handleData(data){
		let result:Array<any> = [];
		data.map(item => {
            let e:any = {};
            e = Object.assign({},item.basicInfo);
            result.push(e);
          });
		return result;
	}

	//search data
	public searchPartners(searchKey){		
		let data = this.projectPartners;	
		let pa = new RegExp(searchKey,'i');
		let list = this.highlightKeyService.dataPattern(pa,data);
		return list;		
	}

	public getPartnersByProjectId(options):Promise<any>{
		let server = this.serverService.getUrl();
	    let url = `${server}getProjectPartnersById`;
	    return new Promise((resolve,reject) => {
	    	if(!this.projectPartners || this.prveProjectId != options.Id){
        		this.httpService.post(url,options)
                        .subscribe(res => {
                        	let data = this.handleData(res);
                        	this.projectPartners = data;
                        	this.prveProjectId = options.Id;
                            resolve(data);                          
                        });
            }else{
            	resolve(this.projectPartners);
            }
    	});
    }
}