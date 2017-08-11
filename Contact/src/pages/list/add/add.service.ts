/**
 * Created by neal on 7/10/2017.
 */
import { Injectable } from '@angular/core';

import { httpService } from '../../../core/providers/http.service';
import { serverService } from '../../../core/providers/server.service';


@Injectable()
export class addService{
  private url: string;
  private contact: any;
  constructor(
    private httpService:httpService,
    private serverService:serverService
  ){
    this.init();
  }

  private init(): void{
    this.url = this.serverService.getUrl();
  }
  public createContact(options,showLoading): any{
    let url = `${this.url}createContact`;
    return this.httpService.creatPromise(url,options,showLoading);
  };

  public getCountries(options): any{
    let url = `${this.url}loadCountriesByFilter`;
    return this.httpService.creatPromise(url,options);
  }

  public saveContact(data): void{
    this.contact = data;
  }

  public saveTelephone(type,data): void{
    this.contact['telephone' + type] = data;
  }

  public getTelephone(type): any{
    return this.contact['telephone'+type];
  }

  public getContact(): any{
    return this.contact;
  }

  public saveContactsToServe(options,showLoading):Promise<any[]>{
    let url = `${this.url}saveContacts`;
    return this.httpService.creatPromise(url,options,showLoading);
  }

  public createPhoto(options,showLoading): any{
    let url = `${this.url}createContactPhoto`;
    return this.httpService.creatPromise(url,options,showLoading);
  }

  public createTelephone(options,showLoading): any{
    let url = `${this.url}createTelephone`;
    return this.httpService.creatPromise(url,options,showLoading);
  }

  public createBase(options,telephoneOptions): Promise<string>{
    return new Promise((resolve,reject) => {
      let tempData=[],count = 0,i= 0, max = telephoneOptions.count?telephoneOptions.count:0;
      if(max===0){
        reject(false);
      }
      else{
        if(telephoneOptions.photo){
          i=1;
          this.createPhoto(options,false).then(
            response => {
              try {
                if (response) {
                  count++;
                  telephoneOptions.photo=response;
                  if (count == max) {
                    for(let j in telephoneOptions){
                      if(tempData.length&&j!="count"&&j!="photo"){
                        telephoneOptions[j]=tempData[tempData.length-1];
                        tempData.pop();
                      }
                    }
                    resolve(telephoneOptions);
                  }
                }
                else {
                  reject(false);
                }
              } catch (error) {
                reject(error);
              }
            }, function (error) {
              reject(error);
            });
        }
        for(let i =0;i<max;i++){
          this.createTelephone(options,false).then(
            response => {
              try {
                if (response) {
                  count++;
                  tempData.push(response);
                  if (count == max) {
                    for(let j in telephoneOptions){
                      if(tempData.length&&j!="count"&&j!="photo"){
                        telephoneOptions[j]=tempData[tempData.length-1];
                        tempData.pop();
                      }
                    }
                    resolve(telephoneOptions);
                  }
                }
                else {
                  reject(false);
                }
              } catch (error) {
                reject(error);
              }
            }, function (error) {
              reject(error);
            });
        }
      }
    });
  }

  public setRequestOptions(contact,base,singleData): any{
    let options:any = {};
    let email:string;
    if(singleData.emails===null){
      email = '';
    }else{
      email = singleData.emails[0].value;
    }
    options = {
      "Contacts": {
        "MainItemId" : contact.id,
        "MainItemVersion" : contact.version,
        "ContactToSave" : {
          "Id": contact.id,
          "BusinessPartnerFk": contact.businessPartnerFk,
          "SubsidiaryDescription": "",
          "FirstName" : singleData.name.givenName?singleData.name.givenName:'',
          "FamilyName" : singleData.name.familyName?singleData.name.familyName:'',
          "Email" : email,
          "Version": contact.version,
          "ContactRoleDescription": ""
        }
      }
    };
    if(singleData.phoneNumbers&&singleData.phoneNumbers.length>0){
      for(let singlePhone of singleData.phoneNumbers){
        if(singlePhone.type === 'mobile'){
          options.Contacts.MobileToSave={
            "Id": base.mobile.id,
            "AreaCode": "",
            "CountryFk":base.mobile.countryFk,
            "PhoneNumber": singlePhone.value,
            "Extention": "",
            "Telephone":singlePhone.value,
            "version": base.mobile.version||0,
            "Pattern": ""
          };
        }
        if(singlePhone.type === 'telephone'||singlePhone.type === 'home fax'){
          options.Contacts.TelephoneToSave={
            "Id": base.telephone.id,
            "AreaCode": "",
            "CountryFk":base.telephone.countryFk,
            "PhoneNumber": singlePhone.value,
            "Extention": "",
            "Telephone":singlePhone.value,
            "version": base.telephone.version||0,
            "Pattern": ""
          };
        }
        if(singlePhone.type === 'home'){
          options.Contacts.Telephone2ToSave={
            "Id": base.telephone2.id,
            "AreaCode": "",
            "CountryFk":base.telephone2.countryFk,
            "PhoneNumber": singlePhone.value,
            "Extention": "",
            "Telephone":singlePhone.value,
            "version": base.telephone2.version||0,
            "Pattern": ""
          };
        }
        if(singlePhone.type === 'fax'){
          options.Contacts.TeleFaxToSave={
            "Id": base.fax.id,
            "AreaCode": "",
            "CountryFk":base.fax.countryFk,
            "PhoneNumber": singlePhone.value,
            "Extention": "",
            "Telephone":singlePhone.value,
            "version": base.fax.version||0,
            "Pattern": ""
          };
        }
      }
    }

    if(base.photo&&singleData.photo.photo){
      options.Contacts.ContactPhotoToSave= {
        "Id":base.photo.id,
        "OwnerId":base.photo.ownerId||contact.id,
        "Photo":singleData.photo.photo.split(",")[1],
        "Version":singleData.photo.version||base.photo.version
      }
    }
    return options;
  }

  public setRequestOption(contact,base,data): any{
    let options:any = {};
    options = {
      "Contact": {
        "MainItemId" : data.basicInfo.id||contact.id,
        "MainItemVersion" : data.basicInfo.version||0,
        "ContactToSave" : {
          "Id": data.basicInfo.id||contact.id,
          "BusinessPartnerFk": data.basicInfo.businessPartnerFk||contact.businessPartnerFk,
          "SubsidiaryDescription": data.basicInfo.subsidiaryDescription||'',
          "FirstName" : data.basicInfo.firstName||'',
          "FamilyName" : data.basicInfo.familyName||'',
          "Email" : data.basicInfo.email||'',
          "Version": data.basicInfo.version||contact.version,
          "ContactRoleDescription": data.basicInfo.contactRoleDescription||''
        }
      }
    };

    if(base.telephone1&&data.telephone){
      options.Contact.TelephoneToSave={
        "Id": data.telephone.id||base.telephone1.id,
        "AreaCode": data.telephone.areaCode||'',
        "CountryFk":data.telephone.countryFk||base.telephone1.countryFk,
        "PhoneNumber": data.telephone.phoneNumber||'',
        "Extention": data.telephone.extention||'',
        "Telephone":data.telephone.telephone||'',
        "version": data.telephone.version||base.telephone1.version,
        "Pattern": data.telephone.pattern||''
      };
    }
    if(base.telephone2&&data.telephone2){
      options.Contact.Telephone2ToSave={
        "Id": data.telephone2.id||base.telephone2.id,
        "AreaCode": data.telephone2.areaCode||'',
        "CountryFk":data.telephone2.country||base.telephone2.countryFk,
        "PhoneNumber": data.telephone2.phoneNumber||'',
        "Extention": data.telephone2.extention||'',
        "Telephone":data.telephone2.telephone||'',
        "version": data.telephone2.version||base.telephone2.version,
        "Pattern": data.telephone2.pattern||''
      };
    }
    if(base.mobile&&data.mobile){
      options.Contact.MobileToSave={
        "Id": data.mobile.id||base.mobile.id,
        "AreaCode": "",
        "CountryFk":data.mobile.countryFk||base.mobile.countryFk,
        "PhoneNumber": data.mobile.phoneNumber,
        "Extention": "",
        "Telephone":data.mobile.telephone||'',
        "version": data.mobile.version||base.mobile.version||0,
        "Pattern":data.mobile.pattern||''
      };
    }

    if(base.fax&&data.teleFax){
      options.Contact.TeleFaxToSave={
        "Id": data.teleFax.id||base.fax.id,
        "AreaCode": "",
        "CountryFk":data.teleFax.countryFk||base.fax.countryFk,
        "PhoneNumber": data.teleFax.phoneNumber,
        "Extention": "",
        "Telephone":data.teleFax.telephone||'',
        "version": data.teleFax.version||base.fax.version,
        "Pattern": data.teleFax.pattern||""
      };
    }

    if(base.photo&&data.photo.photo){
      options.Contact.ContactPhotoToSave= {
        "Id":data.photo.id||base.photo.id,
        "OwnerId":data.photo.ownerId||base.photo.ownerId||contact.id,
        "Photo":data.photo.photo.split(",")[1],
        "Version":data.photo.version||base.photo.version
      }
    }
    return options;
  }
}
