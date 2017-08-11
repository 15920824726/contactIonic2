import { Component,Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';

import { contacts } from '../contact/contacts';
import { favorite } from '../favorite/favorite';
import { partners } from '../partner/partners';
import { projects } from '../project/projects';

@Component({
	selector: 'itwo-footer',
	templateUrl: 'footer.html'
})
export class itwoFooter {
	@Input() curMenuIndex: number;
	translation: any = {};
	menuLists: Array<any>;

	constructor(
		private navCtrl: NavController,
		private tlService: TranslateService) {
	}

	gotoPage(page){
		this.navCtrl.push(page);
	}

	langScope(data){
		this.menuLists = [
			{
				icon: 'contact-icon-favorite',
				name: data.common.favorite,
				page: favorite
			},
			{
				icon: 'contact-icon-contact',
				name: data.common.contacts,
				page: contacts
			},
			{
				icon: 'contact-icon-businesspatner',
				name: data.common.businessPartner,
				page: partners
			},
			{
				icon: 'contact-icon-project',
				name: data.common.project,
				page: projects
			}
		]
	}
	ngOnInit(){

		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe( data => {
			this.langScope(data);
		})
	}
}