import { SMS } from '@ionic-native/sms';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { NavController,NavParams,Platform,AlertController,PopoverController } from 'ionic-angular';

import { partnerService } from '../partner/partner.service';
import { projectService } from '../project/projects.service';
import { contactService } from '../contact/contact.service';
import { httpService } from '../../../core/providers/http.service';
import { toastService } from '../../../core/providers/toast.service';
import { dbService } from '../../../core/providers/database.service';
import { serverService } from '../../../core/providers/server.service';
import { deviceService } from '../../../core/providers/device.service';
import { storageService } from '../../../core/providers/storage.service';
import { DetailOption,ImgOption,requestOptionService } from '../../../core/providers/request-option.service';

import { map } from '../map/map';
import { add } from '../add/add';


@Component({
	selector: 'detail',
	templateUrl:'detail.html'
})
export class detail {
	private options: DetailOption;
	private imgOptions: ImgOption;
  public contactName:string;
	public data: any;
	public translation: any = {};
	public bpName: string;
	private showBtn: boolean = true;
	private favoriteId: number = 0;
  private popList:any;
  private url: string;

	constructor(
		private tlService: TranslateService,
		private navCtrl: NavController,
		private popoverCtrl:PopoverController,
		private navParams: NavParams,
		private platform: Platform,
		private emailComposer: EmailComposer,
		private sms: SMS,
		public alertCtrl: AlertController,
		private dbService: dbService,
		private dvService: deviceService,
		private tsService: toastService,
		private reqOptService: requestOptionService,
		private partnerService: partnerService,
		private httpService: httpService,
		private contactService: contactService,
		private serverService: serverService,
    private projectService: projectService,
    private sgService:storageService){
      		this.url = serverService.getUrl();
	}
	private langScope(data):void {
		this.translation = {
			telephone: data.form.telephone,
			otherTelephone: data.form.OtherTelephone,
			mobile: data.form.mobilePhone,
			fax: data.form.fax,
			email: data.form.email,
			website: data.form.website,
			address: data.form.address,
			addSuccess: data.favorite.addSuccess,
			addFail: data.favorite.addFailure,
			save: data.form.save,
			update: data.form.update,
			message: data.form.message,
			emailClient: data.form.emailClient,
			msgTitle: data.message.message,
			send: data.message.send,
			cancel: data.common.cancel,
			msgSuccess:data.message.success,
			msgFail: data.message.fail,
      delSuccess: data.favorite.delSuccess,
      delFail: data.favorite.delFail
		};

    this.popList = [
      {
        name: data.form.takePhoto,
        checked: false
      },
      {
        name: data.form.photoAlbum,
        checked: false
      }
    ];
	}

	private getContactDetail():void {
		this.contactService
			.getContactDetail(this.options)
			.then(res => {
				this.data = res;
        		this.contactName = `${this.data.basicInfo.firstName} ${this.data.basicInfo.familyName}`;
        		if(this.contactName.length>20){
          			this.contactName = `${this.contactName.substring(0,20)} ···`;
        		}
				this.getImage('loadContactPhoto');
				this.getFavorite(res.basicInfo.id);
			},err => {
				console.error(err);
			});
	}

	private getPartnerDetail():void {
		this.partnerService
			.getPartnerById(this.options)
			.then(res => {
				this.data = res;
				this.getImage('loadBpPhoto');
			},err => {
				console.error(err);
			});
	}

	private getImage(url:string):void{
		url = `${this.url}/${url}`;
		this.httpService
			.getImgData(url,this.imgOptions)
			.then(res => {
				this.data.photo = res;
				this.data.bpName = this.bpName;
			},err => {
				this.data.photo = '';
				this.data.bpName = this.bpName;
			});
	}

	private getFavorite(id?:number): void{
		let changeData = true;
		if(!id){
			id = this.navParams.get('contactId');
		}else{
			changeData = false;
		}

		this.dbService
			.getDataByKey('favorite','id',id)
			.then(res => {
				if(res&&res.length>0){
					if(changeData){
						this.data = res[0];
            this.contactName = `${this.data.basicInfo.firstName} ${this.data.basicInfo.familyName}`;
            if(this.contactName.length>20){
              this.contactName = `${this.contactName.substring(0,20)} ···`;
            }
					}
					this.favoriteId = res[0]['$loki'];
				}else{
					this.favoriteId = 0;
				}
			},err => {
				this.favoriteId = 0;
			});
	}

	private getDetailById():void {
		switch (this.navParams.get('detailType')) {
			case "partner":
				this.setOption();
				this.getPartnerDetail();
				this.showBtn = !this.showBtn;
				break;
			case "favorite":
				this.getFavorite();
				this.showBtn = !this.showBtn;
				break;
			default:
				this.setOption();
				this.getContactDetail();
				break;
		}
	}

	private setOption():void {
		this.options = this.reqOptService.getDetailOption();
		this.imgOptions = this.reqOptService.getImgOption();
	}

	public gotoMap(address):void {
		let data = {
			latitude: address.latitude ? address.latitude: '',
			longitude: address.longitude ? address.longitude: '',
			addressLine: address.addressLine
		}
		this.navCtrl.push(map,{map: data });
	}

	public favorite(contact): void{
		if(!this.favoriteId){
			this.dbService
				.addData('favorite',contact)
				.then(res => {
					this.favoriteId = res['$loki'];
					this.tsService.success(this.translation.addSuccess);
				},err => {
					this.tsService.success(this.translation.addFail);
				});
		}else{
			this.dbService
				.delDataById('favorite',this.favoriteId)
				.then(res => {
					this.favoriteId = 0;
					this.tsService.warning(this.translation.delSuccess);
				},err => {
					this.tsService.error(this.translation.delFail);
				});
	}
	}

	public email(str:string):void {
		if (this.platform.is('cordova')) {
		  let info = {
		    to: str,
		    isHtml: true
		  };
		  this.sendEmail(info);
		}
	}

	private sendEmail(info):void {
		this.emailComposer.isAvailable()
		.then(() =>{
			this.emailComposer.open(info);
		}, (err) => {
			this.tsService.error(this.translation.emailClient);
		});
	}

	public message(phoneNumber): void {
		let prompt = this.alertCtrl.create({
		message: this.translation.msgTitle,
			inputs: [
			{
				name: this.translation.msgTitle,
				placeholder: this.translation.msgTitle
			}
			],
			buttons: [
			{
				text: this.translation.cancel,
				handler: data => {

				}
			},
			{
				text: this.translation.send,
				handler: data => {
					this.sendMessage(phoneNumber,data.Message);
				}
			}]
		});
		prompt.present();
	}
	private sendMessage(phoneNumber,message):void{
		if (this.platform.is('cordova')) {
		   this.sms.send(phoneNumber,message)
		   			.then(res => {
		   				this.tsService.success(this.translation.msgSuccess);
		   			},err => {
		   				this.tsService.success(this.translation.msgFail);
		   			});
		}
	}

  public gotoEdit(): void{
    this.navCtrl.push(add,{contactDetail:this.data,addType:1});
  }

	ngOnInit(){
		let transltation = this.tlService.getTranslation(this.tlService.currentLang);
		transltation.subscribe(data => {
			this.langScope(data);
			this.bpName = this.navParams.get('bpName');
			this.getDetailById();
		});


	}
}
