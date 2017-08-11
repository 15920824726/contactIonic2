import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { serverService } from '../../../core/providers/server.service';
import { httpService } from '../../../core/providers/http.service';
import { highlightKeyService } from '../share/highlight.key.service';

@Injectable()
export class contactService {	
	contact: any;
	partnerContact: any;
	prveBpId: number;
	constructor(
		private http: Http,
		private httpService: httpService,
		private serverService: serverService,
		private highlightKeyService:highlightKeyService){
	}

	getContacts(options):Promise<any[]> {
		let server = this.serverService.getUrl();
		let url = `${server}getContactSummaryItems`;
		return this.httpService.creatPromise(url,options);
	}

	getContactDetail(options): Promise<any>{
		let server = this.serverService.getUrl();
		let url = `${server}getContactDetailById`;
		return this.httpService.creatPromise(url,options);
	}

    //search data
	public searchPartners(searchKey){		
		let data = this.partnerContact;	
		let pa = new RegExp(searchKey,'i');
		let list = this.highlightKeyService.dataPattern(pa,data);
		return list;		
	}

	public getContactsByBpId(options):Promise<any>{
		let server = this.serverService.getUrl();
	    let url = `${server}loadContactsByBp`;
	    return new Promise((resolve,reject) => {
        this.httpService.post(url,options)
          .subscribe(res => {
            this.partnerContact = res;
            this.prveBpId = options.BpId;
              resolve(this.partnerContact);
          });
    	});
    }
}