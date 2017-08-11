import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Platform } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { File } from '@ionic-native/file';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Contacts } from '@ionic-native/contacts';

const FILE_URL = {
  picPath: 'picture/',
  exportPath: 'exportFile/',
  jsonPath: './assets/json/'
};

@Injectable()
export class deviceService {
  private cameraOptions: CameraOptions = {};
  public iconData: any = {};
  public devicePath: string;
  public fontData: any;

  constructor(
    private http: Http,
    private device: Device,
    private file: File,
    private camera: Camera,
    private platform: Platform,
    private contacts: Contacts) {
    this.cameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      saveToPhotoAlbum: false,
      allowEdit: false,
    };
    this.initIcon();
    this.initFont();
  }

  private initIcon(): void {
    this.http.get(FILE_URL.jsonPath + 'icon.json')
      .subscribe(res => {
        this.iconData = res.json();
      });
  }

  public getIconData(): any{
    return this.iconData;
  }

  private initFont(): void {
    this.http.get(FILE_URL.jsonPath + 'ttf.json')
      .subscribe(res => {
        this.fontData = res.json();
      });
  }

  public getDeviceInfo(): any {
    return this.device;
  }

  public isCordova(): boolean {
    if (this.platform.is('cordova')) {
      return true;
    } else {
      return false;
    }
  }

  public isMobile(): boolean {
    if (this.platform.is('iphone') || this.platform.is('mobile')) {
      if (this.platform.isLandscape() && this.platform.width() < 768 || this.platform.isPortrait() && this.platform.height() < 768) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  public readImage(fileName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      let dataPath = this.devicePath + FILE_URL.picPath;
      this.file.readAsText(dataPath, fileName)
        .then((data) => {
          resolve(data);
        }, (error) => {
          reject(error);
        });
    });
  }

  public saveImage(imgData: any): Promise<any> {
    return new Promise((resolve, reject) => {
      let dataPath = this.devicePath + FILE_URL.picPath;
      let fileName = new Date().getTime().toString();
      this.file.writeFile(dataPath, fileName, imgData, true)
        .then((success) => {
          resolve(fileName);
        }, (error) => {
          reject(error);
        });
    });
  }

  public takePhoto(param: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (param.act === 0) {
        this.cameraOptions.sourceType = this.camera.PictureSourceType.CAMERA;
      } else if (param.act === 1) {
        this.cameraOptions.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
      }
      this.cameraOptions.targetWidth = param.width;
      this.cameraOptions.targetHeight = param.width;
      this.camera.getPicture(this.cameraOptions)
        .then((imgData) => {
          resolve(imgData);
        }, (error) => {
          reject(error);
        });
    });
  }

  public getContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.contacts.find(['*'])
        .then((entry) => {
          resolve(entry);
        }, (error) => {
          reject(error);
        });
    });
  }
}
