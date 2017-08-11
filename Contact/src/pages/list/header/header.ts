import { Component,Input } from '@angular/core';
import { NavController,NavParams,PopoverController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { PopoverComponent } from '../../../core/components/popover.component';
import { setting } from '../../setting/setting/setting';
import { add } from '../add/add';
import {addMobile} from "../add-mobile/add-mobile";

@Component({
	selector: 'contact-header',
	templateUrl: 'header.html'
})
export class contactHeader {
	@Input() showAddButton: boolean;
	title: string;
	translation: any = {};
	popList: Array<any>;
	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private popoverCtrl: PopoverController,
		private tlService: TranslateService,){
	}

	gotoSetting(){
		this.navCtrl.push(setting);
	}

	openPopover(event: any){
		let popover = this.popoverCtrl.create(PopoverComponent,this.popList);
		popover.present({
			ev:event
		});

		popover.onWillDismiss(data => {
			if(data == this.popList[0]){
				this.navCtrl.push(add,{addType:0,parentName:this.title});
			}else{
				this.navCtrl.push(addMobile,{parentName:this.title});
			}
		});
	}

	langScope(data){
		this.popList = [
			{
				name: data.header.newContact,
				checked: false
			},
			{
				name: data.header.deviceContact,
				checked: false
			}
		];
	}

	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data);
		});

		if(typeof this.showAddButton ==='string'&&this.showAddButton==='true'){
	      	this.showAddButton = true;
	    }else{
	      	this.showAddButton= false;
	    }

	    this.title = this.navParams.get('parentName');
	}
}
