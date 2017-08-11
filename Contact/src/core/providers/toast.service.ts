import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


@Injectable()
export class toastService {
  constructor(private toastCtrl: ToastController) {
 
  }

  public success(msg: string): void {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      cssClass: 'success',
    });
    toast.present();
  }

  public warning(msg: string): void {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: 'warning',
    });
    toast.present();
  }

  public error(msg: string): void {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: 'error',
    });
    toast.present();
  }
}