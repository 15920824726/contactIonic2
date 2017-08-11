import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { contactService } from './contact.service';
import { detail } from '../detail/detail';
import { partners } from '../partner/partners';
import { ListsOption,BPOption,requestOptionService } from '../../../core/providers/request-option.service';
import { highlightKeyService } from '../share/highlight.key.service';

import { Contact } from '../../../core/type/datatype';

@Component({
	selector: 'contacts',
	templateUrl: 'contacts.html'
})
export class contacts {
	public contacts: Array<Contact> = [];
	private ListOptions: ListsOption;
	private bpOptions: BPOption;
	public hasPattern: boolean = false;
	private translation: any;
	private noData: boolean = false;
	private contactType: boolean;
  private bpName:string;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private tlService: TranslateService,
		private contactService: contactService,
		private reqOptService: requestOptionService,
		private highlightKeyService: highlightKeyService){
	}

	public gotoDetail(contact):void {
		this.reqOptService.setDataId(contact.id);
		this.navCtrl.push(detail,{bpName: this.bpName});
	}

	//search data
	public searchContacts(ev:any):void {
		let key = ev.target.value;
		if(this.contactType){
			// don't has partner id
			if(key && key.trim != ''){
				this.ListOptions.FilterRequest.Pattern = key;									
			}else{
				this.ListOptions.FilterRequest.Pattern = '';
			}
	
			this.ListOptions.FilterRequest.PageNumber = 0;
	        this.contacts = [];
			this.getContactSummaryItems();			
		}else{
			// has partner id
			if(key && key.trim != ''){	
				this.contacts = this.contactService.searchPartners(key);					
			}else{
				this.getContactsByBpId();
			}			
		}			
	}

	private getContactSummaryItems(){
		this.contactService
			.getContacts(this.ListOptions)
			.then(res => {
				let pageNumber = this.ListOptions.FilterRequest.PageNumber;
				if(!res || (res.length==0 && pageNumber == 0)){
					this.contacts = [];
					this.noData = true;
				}else{
					this.noData = false;
					let pa = this.ListOptions.FilterRequest.Pattern;
					let data:any;
					if(pa){
						data = this.highlightKeyService.dataPattern(pa,res);
					}else{
						data = res;
					}
					this.contacts = this.contacts.concat(data);
					this.ListOptions.FilterRequest.PageNumber++;
				}
			},err => {
				let pageNumber = this.ListOptions.FilterRequest.PageNumber;
				if(pageNumber == 0){
					this.contacts = [];
					this.noData = true;
				}
			});
	}

	private getContactsByBpId(){		
		this.contactService
			.getContactsByBpId(this.bpOptions)
			.then( res => {
				if(res && res.length>0){
					this.noData   = false;
					this.contacts = res;
				}else{
					this.noData   = true;
					this.contacts = [];
				}
			},err => {
				this.noData = true;
				this.contacts = [];				
			});
	}

	//get contact data
	private getContacts():void {
		if(this.contactType){
			//there is not partner id
			this.getContactSummaryItems();			
		}else{
			//there is has partner id
			this.getContactsByBpId();
		}
	}

	//when scroll get more contacts data 
	public getMoreContacts(ev:any):void{
		setTimeout(() => {
			this.getContactSummaryItems();
			ev.complete();
		},3000);		
	}

	//set request options
	private setOption():void {
		this.ListOptions = this.reqOptService.getListsOption();
		this.bpOptions = this.reqOptService.getBPOption();
	}

	//get the parent nav
	private setContactType(){
		this.bpName = this.navParams.get('parentName');
		if(this.bpName){
			this.contactType = false;
		}else{
			this.contactType = true;
		}
	}

	private langScope(data){
		this.translation = {
			search: data.common.search,
      cancel: data.common.cancel,
		};
	}

	public gotoPartner(){
	  this.navCtrl.push(partners);
  }

	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data);
		});
		this.setOption();
		this.setContactType();
		this.getContacts();
		
	}
}