import { Http, HttpModule } from "@angular/http";
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { PopoverComponent } from './components/popover.component';
import { NodataComponent } from './components/no-data.component';
import { ImgComponent } from './components/img-data.component';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { langService } from './providers/translate/translate.service';
import { TRANSLATIONS } from './providers/translate/translate-constant';

import { dbService } from './providers/database.service';
import { storageService } from './providers/storage.service';
import { Broadcaster } from './providers/broadcaster.service';
import { deviceService } from './providers/device.service';
import { toastService } from './providers/toast.service';
import { serverService } from './providers/server.service';
import { tokenService } from './providers/token.service';
import { httpService } from './providers/http.service';
import { requestOptionService } from './providers/request-option.service';

@NgModule({
  declarations: [
    NodataComponent,
    PopoverComponent,
    ImgComponent
  ],
  providers: [
    dbService,
    deviceService,
    langService,
    storageService,
    Broadcaster,
    toastService,
    serverService,
    tokenService,
    httpService,
    requestOptionService
  ],
  entryComponents: [
    PopoverComponent,
    ImgComponent
  ],
  imports: [
    IonicModule,
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: TRANSLATIONS,
        deps: [Http]
      }
    })
  ],
  exports: [
    NodataComponent,
    PopoverComponent,
    ImgComponent
  ]
})
export class CoreModule {
  constructor(
    public dvService: deviceService,
    public langService: langService,
    private dbService: dbService) {
      this.langService.setLang();
  }  
}