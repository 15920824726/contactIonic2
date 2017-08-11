import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from "@ngx-translate/core";

import { storageService } from '../../../core/providers/storage.service';

@Component({
  templateUrl: 'language.html'
})
export class Language {
  title: string;
  langList: Array< any >;
  
  constructor(
    public navCtrl: NavController,
    private tlService: TranslateService,
    private sgService: storageService) {

  }

  langChange(language) {
    this.langList.forEach(l => {
      if (l.lang == language.lang) {
        l.checked = true;
      } else {
        l.checked = false;
      }
    });
    this.tlService.use(language.lang);
    this.sgService.setItem('public', 'currentLang' , language.lang);
  }

  langScope(data: any) {
    this.title = data.language.language;
    let currentLang = this.tlService.currentLang;
    let list = ['en', 'zh', 'de'];
    let langList = [];
    list.forEach((l,i) => {
      langList.push({
        name: data.language[l],
        lang: l,
        checked: l == currentLang ? true : false
      });
    });
    this.langList = langList;
  }

  ngOnInit() {
    let getTranslation = this.tlService.getTranslation(this.tlService.currentLang);
    getTranslation.subscribe( data => {
      this.langScope(data);
    });
    this.tlService.onLangChange.subscribe( data => {
      this.langScope(data.translations);
    });
  }

}
