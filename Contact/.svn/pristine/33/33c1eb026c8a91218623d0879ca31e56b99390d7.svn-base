import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController } from 'ionic-angular';

import { storageService } from '../../../core/providers/storage.service';
import { contacts } from '../../list/contact/contacts';
import { companyService } from '../company/company.service';

@Component({
	selector: 'roles',
	templateUrl: 'roles.html'
})
export class roles {
	translation: any = {};
	roles: Array<any> = [];
	selectedRoleId: string;
	constructor(
		private tlService: TranslateService,
		private navCtrl: NavController,
		private sgService: storageService,
		private companyService: companyService){

	}

	private langScope(data){
		this.translation.title = `${data.select} ${data.role}`;
	}

	public selectRole(role){		
		this.companyService.setSelectedRole(role);
		this.navCtrl.push(contacts);
	}

	public gotoBack(){
		this.navCtrl.pop();
	}
	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data.common);
		});

		this.roles = this.companyService.getRoles();
		let selectedRole:any = this.sgService.getItem('public','role');	
		if(selectedRole){
			this.selectedRoleId  = selectedRole.key;	
		}
	}
}