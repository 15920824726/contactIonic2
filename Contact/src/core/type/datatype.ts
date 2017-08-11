export class Entity {
  public countryName:string;
  public areaCode: string;
  public countryFk:number;
  public extention: string;
  public id:number;
  public pattern:string;
  public phoneNumber:string;
  public telephone: string;
  public version:number
}

export class OwnDefine {
  public state: boolean;
  public value: string;
}

export class Contact {
  public addressLine:string;
  public bpId: number;
  public bpName1: string;
  public familyName: string;
  public firstName: string;
  public id: number;
  public ownDefine?: OwnDefine;
  public telephone: string;
  public telephone2: string;
  public telephone2Pattern: string;
  public telephonePattern: string;
}

export class BasicInfo {
  public businessPartnerFk:number;
  public contactRoleDescription: string;
  public familyName: string;
  public firstName:string;
  public id:number;
  public subsidiaryDescription: string;
  public version:number
}

export class TeleFax {
  public countryFk: number;
  public id: number;
  public pattern: string;
  public phoneNumber: string;
  public telephone: string;
  public version: number;
}

export class Telephone {
  public countryName:string;
  public areaCode: string;
  public country: string;
  public extention: string;
  public id: number;
  public pattern: string;
  public phoneNumber: number;
  public telephone: string;
  public version: number;
}

export class Mobile {
  public countryFk: number;
  public id: number;
  public pattern: string;
  public phoneNumber: string;
  public telephone: string;
  public version: number;
}

export class Photo{
  public id:number;
  public ownerId:number;
  public photo:string;
  public version:number
}

export class ContactDetail {
  public basicInfo: BasicInfo;
  public teleFax: TeleFax;
  public telephone: Telephone;
  public telephone2: Telephone;
  public photo: Photo;
  public pbName: string;
  public mobile:Mobile;
}

