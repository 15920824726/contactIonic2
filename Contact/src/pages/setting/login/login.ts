import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NavController, PopoverController } from 'ionic-angular';

import { PopoverComponent } from '../../../core/components/popover.component';
import { deviceService } from '../../../core/providers/device.service';
import { storageService } from '../../../core/providers/storage.service';
import { tokenService } from '../../../core/providers/token.service';
import { toastService } from '../../../core/providers/toast.service';
import { userService } from './user.service';
import { serverService } from '../../../core/providers/server.service';
import { server } from '../server/server';
import { companys } from '../company/companys';
import { contacts } from '../../list/contact/contacts';


@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class login {
  icons: any = {};
  translation: any = {};
  langName: string;
  langList: Array< any >;
  user: any = {};
  feedback: any = {
    show: false
  };

  constructor(
    private navCtrl: NavController,
    private popoverCtrl: PopoverController,
  	private dvService: deviceService,
  	private tlService: TranslateService,
    private sgService: storageService,
    private userService: userService,
    private tokenService: tokenService,
    private tsService: toastService,
    private serverService: serverService
  	) {
  }
  
  public gotoServer():void {
    this.navCtrl.push(server);
  }

  public gotoCompany():void {

    if(this.formValid()){

      this.feedback.show = true;
      this.feedback.msg = this.translation.busyMsg;

      this.userService.login(this.user.username,this.user.password).then((res) => {
        if(res){
          this.loginSuccess();          
        }else{         
          this.loginError();
        }
      },() => {
        this.loginError();     
      });      
    }
  }

  private loginSuccess():void {
    this.feedback.show = true;
    this.feedback.msg = this.translation.successMsg;
    this.isRememberHandler();    
    this.navCtrl.push(companys);
  }

  private loginError():void {
    this.feedback.show = true;
    this.feedback.msg = this.translation.failedMsg;
    this.userService.removeLoginUser();
    setTimeout(() => {
      this.feedback.show = false;
    }, 2000, true);
  }

  public isRememberHandler():void {
    if(this.user.remember){
      this.userService.saveLoginUser(this.user);
    }else{
      this.userService.removeLoginUser();
    }
  }
  private langScope(data:any):void {
    let currentLang = this.tlService.currentLang;
    let list = ['en', 'zh', 'de'];
    let checked = false;
    this.langList = [];
    list.forEach((l,i) => {
      if(l == currentLang){
        this.langName = data.language[l];
        checked = true;
      }else{
        checked = false;
      }
      this.langList.push({
        name: data.language[l],
        lang: l,
        checked: checked
      });
    });

    this.translation = {
      language: data.language.language,
      username: data.login.loginName,
      password: data.login.loginPassword,
      login: data.login.login,
      remember: data.login.remember,
      serverConfig: data.server.serverConfig,
      busyMsg: data.login.busyMsg,
      successMsg: data.login.successMsg,
      failedMsg: data.login.failedMsg,
      isEmpty:data.login.isEmpty
    };
  }
  public langChange(language):void {
    let popover = this.popoverCtrl.create(PopoverComponent, this.langList);
    popover.present({
      ev: event
    });
    popover.onWillDismiss( data => {
      if(data && data.name){
        this.langName = data.name;
        this.tlService.use(data.lang);
        this.sgService.setItem('public', 'currentLang' , data.lang);
      }
    });    
  }

  private formValid():boolean {
    if(!this.langName || !this.langName.trim()){    
      this.tsService.warning(`${this.translation.language} ${this.translation.isEmpty}`);
      return false;
    }
    if(!this.user.username || !this.user.username.trim()){      
      this.tsService.warning(`${this.translation.username} ${this.translation.isEmpty}`);
      return false;
    }
    if(!this.user.password || !this.user.password.trim()){
      this.tsService.warning(`${this.translation.password} ${this.translation.isEmpty}`);
      return false;
    }
    return true;
  }

  private checkLogin(currentRoute):void {
    let status = this.serverService.getStatus();
    let selectedCompany = this.sgService.getItem('public','company');
    if(this.user && !status){
        this.tokenService.checkForValidToken().then(valid => {
          if(selectedCompany){
            this.navCtrl.push(currentRoute);
          }else{
            this.navCtrl.push(companys);
          }
      },() => {
        this.navCtrl.push(server);
      });
    }
  }

  ngOnInit() {   
    this.icons = this.dvService.iconData;

    let lastUser: any = this.sgService.getItem('public','user');    
    if(lastUser){  
      this.user = lastUser;
      this.user.remember = true;  
    }else{
      this.user.remember = false;
    }

    let getTranslation = this.tlService.getTranslation(this.tlService.currentLang);
    getTranslation.subscribe( data => {
        this.langScope(data);
        this.checkLogin(contacts);
    });

    this.tlService.onLangChange.subscribe( data => {
      this.langScope(data.translations);
    });   

    this.feedback.show = false;
  }
  
}
