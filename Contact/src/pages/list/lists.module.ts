import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';

import { CoreModule } from '../../core/core.module';

import { itwoFooter } from './footer/footer';
import { contactHeader } from './header/header';
import { highlightKeyService } from './share/highlight.key.service';

import { contactService } from './contact/contact.service';
import { contacts } from './contact/contacts';
import { favorite }  from './favorite/favorite';

import { map } from './map/map';
import { mapService } from './map/map.service';

import { partnerService } from './partner/partner.service';
import { partners } from './partner/partners';
import { projectService } from './project/projects.service';
import { projects } from './project/projects';
import { projectDetail } from './project-detail/project-detail';
import { addService } from './add/add.service';

import { add } from './add/add';
import { addMobile } from './add-mobile/add-mobile';
import { telephone } from './telephone/telephone';
import { detail } from './detail/detail';

@NgModule({
	declarations: [
		itwoFooter,
		contactHeader,
		contacts,
		favorite,
		partners,
		map,
		projects,
		projectDetail,
		add,
		addMobile,
		telephone,
		detail
	],
	providers:[
		highlightKeyService,
		contactService,
		partnerService,
		mapService,
    	projectService,
    	addService
	],
	entryComponents: [
		itwoFooter,
		contactHeader,
		contacts,
		favorite,
		partners,
		map,
		projects,
		projectDetail,
		add,
		addMobile,
		telephone,
		detail
	],
	imports: [IonicModule,CoreModule]
})
export class ListsModule {
	constructor(){

	}

}
