import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController,NavParams } from 'ionic-angular';

import { deviceService } from '../../../core/providers/device.service';
import { storageService } from '../../../core/providers/storage.service';
import { serverService } from '../../../core/providers/server.service';
import { toastService } from '../../../core/providers/toast.service';
import { tokenService } from '../../../core/providers/token.service';
import { login } from '../login/login';

export class Translation {
  identityServer: string;
  appServer: string;
  apply: string;
  isEmpty:string
}

@Component({
  selector: 'server',
  templateUrl: 'server.html'
})
export class server {
  private status: boolean = false;
  private icons: any = {};
  private translation: Translation;
  private server: any = {};

  constructor(
  	private navCtrl: NavController,
    private navParmas: NavParams,
  	private dvService: deviceService,
  	private tlService: TranslateService,
    private tsService: toastService,
    private sgService: storageService,
    private serverService: serverService,
    private tkService: tokenService
  	) {    
  }
  ngAfterContentChecked(){
    this.icons = this.dvService.iconData;    
  }

  ngOnInit(){ 
    this.translation = {
      identityServer: '',
      appServer: '',
      apply: '',
      isEmpty:'',
    };

    this.status = this.serverService.getStatus();

  	let getTranslation = this.tlService.getTranslation(this.tlService.currentLang);
    this.server = this.serverService.getServer();
    getTranslation.subscribe( data => {
      this.langScope(data);
      this.checkServer();
    });
  }

  private langScope(data:any):void {
    this.translation = {
      identityServer: data.server.authenticationServer,
      appServer: data.server.appServer,
      apply: data.server.apply,
      isEmpty:data.login.isEmpty
    };
  }

  private formValid():boolean {
    if(!this.server.appServer || !this.server.appServer.trim()){
      this.tsService.warning(`${this.translation.appServer} ${this.translation.isEmpty}` );
      return false;
    }
    if(!this.server.identityServer || !this.server.identityServer.trim()){
      this.tsService.warning(`${this.translation.identityServer} ${this.translation.isEmpty}` );
      return false;
    }
    return true;
  }

  private checkServer():void {
    let status = this.serverService.getStatus();
    if(this.sgService.getItem('public','user')){ 
      if(!status){    
        this.navCtrl.push(login);
      } 
    }
  }

  public gotoLogin():void {    
    if(this.formValid()){
      this.serverService.setStatus({currentStatus: 'server'});
      this.serverService.setServer(this.server);
      this.tkService.modifyServer(this.server);
      this.navCtrl.push(login);
    }  	
  }
}
