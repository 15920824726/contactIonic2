import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { deviceService } from './../providers/device.service';

@Component({
	selector: 'no-data',
	template: `
    <div class="no-data">
      <img src={{icons?.noData}} class="no-data-img">
      <p>{{translation?.noData}}</p>
    </div>
	`
})

export class NodataComponent {
	private translation: any;
	private icons: any;
	constructor(
	  	private tlService: TranslateService,
    	private dvService: deviceService){

	}

	private langScope(common): void{
		this.translation = {
			noData: common.noData
		}
	}

	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
      		this.icons = this.dvService.iconData;
			this.langScope(data.common);
		});
	}
}
