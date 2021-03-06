import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { ListsOption,requestOptionService } from '../../../core/providers/request-option.service';
import { projectDetail } from '../project-detail/project-detail';
import { highlightKeyService } from '../share/highlight.key.service';
import { projectService } from './projects.service';
import { partners } from '../partner/partners';


@Component({
	templateUrl:'projects.html'
})
export class projects {
	private options: ListsOption;
	private noData: boolean = false;
	private projects: Array<any> = [];
	private translation:any;
	constructor(
		private navCtrl: NavController,
		private tlService: TranslateService,
		private reqOptService: requestOptionService,
		private highlightKeyService: highlightKeyService,
    	private projectService:projectService){

	}
	public gotoPartney(project){
		this.navCtrl.push(partners,{parentName: project.ownDefine?(project.ownDefine.initName||''):(project.matchCode||project.projectName),projectId:project.id});
	}
	public gotoDetail(project){
		this.navCtrl.push(projectDetail,{project:project,parentName: project.projectName});
	}
	//search data
	public searchPartner(ev:any){
		if(ev.target.value){
			this.options.FilterRequest.Pattern = ev.target.value;
		}else{
			this.options.FilterRequest.Pattern = '';
		}
		this.options.FilterRequest.PageNumber = 0;
        this.projects = [];
		this.getProjects();
	}

	private setRequestOption(): void {
		this.options = this.reqOptService.getListsOption();
		this.options.FilterRequest.UseCurrentClient = true;
		this.options.FilterRequest.orderBy = [{
			Field: "ProjectName",
			Desc: false
		}];
	}

	private getProjects():void {
		this.projectService
			.getProjects(this.options)
			.then( res => {
				let pageNumber = this.options.FilterRequest.PageNumber;
				if(!res || (res.length==0 && pageNumber ==0)){					
					this.noData = true;
					this.projects = [];
				}else{
					this.noData = false;
					let pa = this.options.FilterRequest.Pattern;
					let data = this.highlightKeyService.dataPattern(pa,res);
					this.projects = this.projects.concat(data);
					this.options.FilterRequest.PageNumber++;
				}
			},err => {
				let pageNumber = this.options.FilterRequest.PageNumber;
				if(pageNumber == 0){
					this.noData = true;
					this.projects = [];
				}
			});
	}

	//when scroll ,get mort projects
	getMoreProjects(ev:any):void{
		setTimeout(() => {
			this.getProjects();
			ev.complete();
		},3000)
	}

	private langScope(data){
		this.translation = {
			search: data.common.search,
			cancel: data.common.cancel,
		}
	}

	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data);
		});
		this.setRequestOption();
		this.getProjects();
	}
}
