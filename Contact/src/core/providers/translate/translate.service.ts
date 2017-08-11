import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { storageService } from '../storage.service';

@Injectable()
export class langService {
  private globalLanguages : Array<any>;
  
  constructor(
    private tlService: TranslateService,
    private sgService: storageService) {
  	this.globalLanguages = [
	    {
	      language: 'de',
	      languageName: 'German',
	      languageName$tr$: 'platform.loginLanguageGerman',
	      culture: 'de-de'
	    },
	    {
	      language: 'en',
	      languageName: 'English',
	      languageName$tr$: 'platform.loginLanguageEnglish',
	      culture: 'en-gb'
	    },
	    {
	      language: 'zh',
	      languageName: 'Chinese',
	      languageName$tr$: 'platform.loginLanguageChinese',
	      culture: 'zh-cn'
	    }
	  ];
  }

  private getDefaultLanguageOptions(): any {
    //default
    let languageOptions = {
      language : 'en',
      culture : 'en-gb'
    };
    let browserCulture = navigator.language || 'en-gb';
    for (let item of this.globalLanguages) {
      if(browserCulture == item.culture) {
        languageOptions.language = item.language,
        languageOptions.culture = browserCulture;
      }
    } 
    return languageOptions;
  }

  private setDefaultLang(): void {
    let lang = this.getDefaultLanguageOptions().language;
    this.tlService.setDefaultLang(lang);
    this.tlService.use(lang);
  }

  public setLang(): void {
    let storageLang = this.sgService.getItem('local', 'currentLang');
    if(storageLang) {
        this.tlService.setDefaultLang(storageLang);
        this.tlService.use(storageLang);
    } else {
        this.setDefaultLang();
    }
  }
}
