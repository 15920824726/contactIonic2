import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController,NavParams } from 'ionic-angular';

import { map } from '../map/map';
import { detail } from '../detail/detail'
import { projects } from '../project/projects';
import { requestOptionService } from '../../../core/providers/request-option.service';

@Component({
	selector: 'project_detail',
	templateUrl:'project-detail.html'
})
export class projectDetail {
	private data: any;
	private translation: any = {};
	private bpName: string;
	public showBtn: boolean = true;
	public favoriteId: number = 0;
	public noData: boolean = false;

	constructor(
		private tlService: TranslateService,
		private navCtrl: NavController,
		private navParams: NavParams,
		private resOptService: requestOptionService){

	}

	private langScope(form):void {
		this.translation = {
			telephone: form.telephone,
			otherTelephone: form.OtherTelephone,
			mobile: form.mobilePhone,
			fax: form.fax,
			email: form.email,
			website: form.website,
			address: form.address,
			customer: form.customer,
			contactRole: form.contactRole,
			customerContact: form.customerContact,
			projectName: form.projectName
		}
	}


	private getProjectDetail():void {
		let project = this.navParams.get('project');
		this.data = project;
		if(this.data.hasOwnProperty('telephone')||this.data.hasOwnProperty('mobile')||
      this.data.hasOwnProperty('teleFax')||this.data.hasOwnProperty('email')||
      this.data.hasOwnProperty('addressLine')||this.data.hasOwnProperty('bpName1')||
      this.data.hasOwnProperty('contactRoleDescription')||this.data.hasOwnProperty('firstName')){
        this.noData = false;
    }else{
		  this.noData = true;
    }
	}

	public gotoProject(): void{
    this.navCtrl.push(projects)
  }

	public gotoContact(){
		this.resOptService.setDataId(this.data.contactFk);
		this.navCtrl.push(detail,{"detailType":"project","projectDetail":this.data});
	}

	public gotoMap():void {
		let data = {
			latitude: this.data.latitude ? this.data.latitude: '',
			longitude: this.data.longitude ? this.data.longitude: '',
			addressLine: this.data.addressLine
		}
		this.navCtrl.push(map,{map: data });
	}

	ngOnInit(){
		let transltation = this.tlService.getTranslation(this.tlService.currentLang);
		transltation.subscribe(data => {
			this.langScope(data.form);
			this.bpName = this.navParams.get('bpName');
			this.getProjectDetail();
		});
	}
}
