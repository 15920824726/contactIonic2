/**
 * Created by nea on 7/4/2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { httpService } from '../../../core/providers/http.service';
import { serverService } from '../../../core/providers/server.service';

@Injectable()
export class projectService{
    constructor(
        private http:Http,
        private httpService:httpService,
        private serverService:serverService
    ){}

    getProjects(options):Promise<any[]>{
        let server = this.serverService.getUrl();
        let url = `${server}getProjectSummaryItems`;
        return this.httpService.creatPromise(url,options);
    }
}
