/**
 * Created by nea on 7/14/2017.
 */
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController,NavParams} from 'ionic-angular';

import { requestOptionService } from '../../../core/providers/request-option.service';
import { deviceService } from '../../../core/providers/device.service';
import { toastService } from '../../../core/providers/toast.service';

import { addService } from '../add/add.service';
import { contacts } from '../contact/contacts';

@Component({
  templateUrl:'add-mobile.html'
})
export class addMobile {
  private options:any;
  public option:any;
  private translation: any = {};
  private contactsList:any;
  private contactsChecked:any;
  constructor(
    private tlService: TranslateService,
    private navCtrl: NavController,
    private navParams: NavParams,
    private reqOptService:requestOptionService,
    private deviceService:deviceService,
    private addService:addService,
    private tsService:toastService){

  }

  private langScope(form): void{
    this.translation = {
      firstName: form.firstName,
      familyName: form.familyName,
      tel: form.telephone,
      otherTel: form.otherTelephone,
      mobile: form.mobilePhone,
      fax: form.fax,
      email: form.email,
      add:form.add,
      addressList:form.addressList,
      addOneMoreTel:form.addOneMoreTel,
      getContactsFailure:form.getContactsFailure,
      addError:form.addError,
      addSuccess:form.addSuccess
    }
  }

  public addContacts(): void{
    this.contactsChecked = this.contactsList.filter( (ele) => {
      return ele.checked;
    });

    let option = this.reqOptService.getBPOption();
    let requestOption :any;
    let temOption =[];
    let iconData:any = this.deviceService.getIconData();
    for(let singleData of this.contactsChecked){
      singleData.photo = {"photo":iconData.avatar};
      let telephoneOptions = this.getTelephoneOptions(singleData);
      this.addService.createContact(option,false).then(response =>{
          this.addService.createBase({"OwnerId":response.id},telephoneOptions).then(base => {
            requestOption = this.addService.setRequestOptions(response,base,singleData);
            temOption.push(requestOption.Contacts);
            if(temOption.length === this.contactsChecked.length){
              this.options = {
                "Contacts" : temOption
              } ;
              this.addService.saveContactsToServe(this.options,false).then(
                res => {
                  this.tsService.success(this.translation.addSuccess);
                  this.reqOptService.setBpId(response.businessPartnerFk);
                  this.navCtrl.push(contacts,{parentName:this.navParams.get('parentName')});
                  for (let i of this.navCtrl.getViews()) {
                    if (i.name === 'addMobile'||i.name === 'contacts') {
                      this.navCtrl.removeView(i);
                    }
                  }
                }, error => {
                  this.tsService.error(this.translation.addError);
                })
            }
          },error => {
            this.tsService.error(this.translation.addError);
          })
      },error => {
        this.tsService.error(this.translation.addError);
      });
    }
  }

  public getTelephoneOptions(data): any{
    let options:any = {};
    options.count =0;
    if (data.phoneNumbers&&data.phoneNumbers.length > 0) {
      for (let tem of data.phoneNumbers) {
        if (tem.type === 'mobile') {
          options.count++;
          options.mobile = true;
        }
        if (tem.type === 'telephone'||tem.type === 'home fax') {
          options.count++;
          options.telephone = true;
        }
        if (tem.type === 'fax') {
          options.count++;
          options.fax = true;
        }
        if(tem.type === 'home'){
          options.count++;
          options.telephone2 = true;
        }
      }
    }
    if(data.photo){
      options.count++;
      options.photo = true;
    }
    return options;
  }

  private init(): void{
    this.deviceService.getContacts().then( data => {
      for(let singleContact of data){
        singleContact.checked = false;
      }
      this.contactsList = data;
    }, (error) => {
      this.tsService.error(this.translation.getContactsFailure)
    });
  }

  ngOnInit(){
    let transltation = this.tlService.getTranslation(this.tlService.currentLang);
    transltation.subscribe(data => {
      this.langScope(data.form);
    });

    this.init();
  }
}
