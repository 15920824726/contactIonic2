import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CoreModule } from '../../core/core.module';

import { server } from './server/server';
import { userService } from './login/user.service';
import { login }  from './login/login';
import { companyService } from './company/company.service';
import { companys } from './company/companys' ;
import { roles } from './role/roles';
import { setting } from './setting/setting';
import { Language } from './language/language';
import { about } from './about/about';



@NgModule({
	declarations: [server,login,companys,roles,setting,Language,about],
	providers: [userService,companyService],
	entryComponents: [ server,login,companys,roles,setting,Language,about ],
	imports: [IonicModule,CoreModule]
})
export class SettingModule {
	constructor(){
		
	}

}