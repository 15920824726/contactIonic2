import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController,NavParams } from 'ionic-angular';

import { toastService } from '../../../core/providers/toast.service';
import { storageService } from '../../../core/providers/storage.service';
import { companyService } from './company.service';
import { roles } from '../role/roles';
import { login } from '../login/login';

@Component({
	selector: 'companys',
	templateUrl: 'companys.html'
})
export class companys {
	public companies: Array<any> = [];
	public translation: any = {};
	public title: string;
	private selectedCompanyId: number;
	private companyId: number = -1;
	private noData: Boolean = false;

	constructor(
		private tlService: TranslateService,
		private navCtrl: NavController,
		private navParams: NavParams,
		private sgService: storageService,
		private companyService: companyService,
		private tsService: toastService){

	}

	classByType = function (rs) {
        var cls = ['contact-icon-Profitcenter', 'contact-icon-company1', 'contact-icon-group'], index = 0;
        if (rs && rs.companyType)
            index = (rs.companyType - 1) % 3;
        return cls[index];
    };
	
	private langScope(data):void {
		this.translation ={
			title:`${data.common.select} ${data.common.company}`,
			goBack:data.company.goBack
		}
	}

	public gotoLogin():void{
		this.navCtrl.push(login);
	}

	public selectCompamy(company):void{
		this.companyService.setSelectCompany(company);
		if(company.children && company.companyType == 2 && company.children.length >0){
			this.companyId = company.id;			
			this.navCtrl.push(companys,{companyId: company.id});
		}else if(company.companyType == 1){
			this.navCtrl.push(roles);
		}else if(!company.children && company.companyType == 2){
			this.tsService.warning(this.translation.goBack)
    	}
	}

	private getCompaies():void{
		this.companyService
			.getCompanies()
			.then( res => {	
				if(res && res.length>0){
					this.noData = false;
					this.companies = res;	
				}else{
					this.noData = true;
					this.companies = [];
				}			
							
			},err => {
				this.companies = []
				this.noData = true;
			});		
	}
	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data);
			let selectedCompany:any = this.sgService.getItem('public','company');
			if(selectedCompany){
				this.selectedCompanyId = selectedCompany.id;
			}

			this.companyId = this.navParams.get('companyId');		

			if(!this.companyId){
				this.title = this.translation.title;			
				this.getCompaies();
			}else{
				let selectedCompany = this.companyService.getSelectCompany();
				this.companies = selectedCompany.children;
				this.title = `${selectedCompany.code} ${selectedCompany.name}`;
			}
		});		
	}
}