import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { dbService } from '../../../core/providers/database.service';
import { toastService } from '../../../core/providers/toast.service';
import { detail } from '../detail/detail';

@Component({
	selector: 'favorite',
	templateUrl: 'favorite.html'
})
export class favorite {
	favorites: Array<any>;
	noData: boolean = false;
	translation: any;
	constructor(
		private navCtrl: NavController,
		private tlService: TranslateService,
		private dbService: dbService,
		private tsService: toastService
		){

	}
	public gotoDetail(contact){
		this.navCtrl.push(detail,{
			showBackBtn: true,
			contactId: contact.basicInfo.id,
			detailType: 'favorite'
		});
	}

	private getFavorite(){
		this.favorites = this.dbService.getDataByColl('favorite',true);
		if(this.favorites && this.favorites.length>0){
			
		}else{
			this.favorites = [];
			this.noData = true;
		}
	}

	//delete favorite in loki
	public del(id){
		this.dbService
			.delDataById('favorite',id)
			.then(res => {
				this.getFavorite();
				this.tsService.success(this.translation.delSuccess);
			},err => {
				this.tsService.error(this.translation.delFail);
			});
	}

	private langScope(favorite){
		this.translation = {	       
	        delSuccess: favorite.delSuccess,
	        delFail: favorite.delFail
		}
	}

	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data.favorite);
			this.getFavorite();
		});		
	}
}