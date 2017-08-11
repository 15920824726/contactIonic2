import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { deviceService } from '../../../core/providers/device.service';
import { storageService } from '../../../core/providers/storage.service';

const APP = {//jshint ignore:line
	version: '0.0.1',
	appName: 'Business Partner APP',
	company: 'RIB Software SE',
};

@Component({
	selector: 'about',
	templateUrl: 'about.html'
})
export class about {
	translation: any = {};
	data: any  = {};
	icons: any = {};
	constructor(
		private tlService: TranslateService,
		private navCtrl: NavController,
		private dvService: deviceService,
		private sgService: storageService){

	}

	gotoBack(){
		this.navCtrl.pop();
	}

	langScope(data){
		this.translation = {
			about: data.about.about,
			company: data.common.company,
			version: data.about.version
		}
	}

	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data);
		});

		this.icons = this.dvService.iconData

		this.data = APP;
		this.tlService.onLangChange.subscribe(data =>{
			this.langScope(data.translations);
		});
	}
}