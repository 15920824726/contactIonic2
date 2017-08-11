import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Device } from '@ionic-native/device';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { Transfer } from '@ionic-native/transfer';
import { FormsModule } from '@angular/forms';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Contacts } from '@ionic-native/contacts';
import { EmailComposer } from '@ionic-native/email-composer';
import { SMS } from '@ionic-native/sms';

import { CoreModule } from '../core/core.module';
import { ListsModule } from '../pages/list/lists.module';
import { SettingModule } from '../pages/setting/setting.module';

import { Contact } from './app.component';


@NgModule({
  declarations: [
    Contact
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CoreModule,
    SettingModule,
    ListsModule,
    IonicModule.forRoot(Contact,{
      backButtonText:'',
      mode: 'ios'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    Contact
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    Device,
    File,
    Transfer,
    Contacts,
    EmailComposer,
    SMS
  ]
})
export class AppModule {

}
