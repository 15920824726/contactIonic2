import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';

import { tokenService } from '../../../core/providers/token.service';
import { storageService } from '../../../core/providers/storage.service';
import { serverService } from '../../../core/providers/server.service';

import { userService } from '../login/user.service';
import { companys } from '../company/companys';
import { Language } from '../language/language'; 
import { server } from '../server/server';
import { about } from '../about/about';
import { contacts } from '../../list/contact/contacts';


class User {
	photo: string;
	name: string;
	role: string;
}

@Component({
	selector: 'setting',
	templateUrl: 'setting.html'
})
export class setting {
	private translation: any = {};
	private menuList: Array<any>;
	private user: User;
	constructor(
		private tlService: TranslateService,
		private navCtrl: NavController,
		private tkService: tokenService,
		private sgService: storageService,
		private serverService: serverService,
		private userService: userService){

	}

	public goPage(menu){
		if(menu){
			this.navCtrl.push(menu.page);
			if(menu.status){
				this.serverService.setStatus(menu.status);
			}
		}else{			
			this.tkService.logout();
			this.navCtrl.push(server);
		}
	}
	public gotoContacts(){
		this.navCtrl.push(contacts);
	}

	private langScope(data){
		let company:any = this.sgService.getItem('public','company');
		let currentCompany:string = company.name;

		let currentLang = this.tlService.currentLang;
		this.menuList = [
			{
				icon: 'contact-icon-selectcompany',
				name: currentCompany,
				page: companys,
				status: { currentStatus: 'setting' }
			},
			{
				icon: 'contact-icon-language',
				name: data.language[currentLang],
				page: Language
			},
			{
				icon: 'contact-icon-server',
				name: data.server.server,
				page: server,
				status: { currentStatus: 'setting' }
			},
			{
				icon: 'contact-icon-info',
				name: data.about.about,
				page: about
			}
		]
		this.translation.setting  = data.common.setting;
		this.translation.loginOut = data.login.loginOut;
	}

	private getUser():void {
		this.userService.getUser()
			.then(user => {
				this.user = user;
			});		
	}

	ngOnInit(){		
		let translation =  this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data);
			this.getUser();			
		});		
		this.tlService.onLangChange.subscribe(data => {
			this.langScope(data.translations);
		});
	}
}