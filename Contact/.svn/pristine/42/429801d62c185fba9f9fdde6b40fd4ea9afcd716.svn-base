import { Injectable } from '@angular/core';

import { serverService } from '../../../core/providers/server.service';
import { storageService } from '../../../core/providers/storage.service';
import { httpService } from '../../../core/providers/http.service';
import { requestOptionService } from '../../../core/providers/request-option.service';

@Injectable()
export class companyService {
	private companies: any;
	private roles: Array<any> = [];
	private rolesLookup: any;
	private selectedCompany: any;
	private selectedRole;
	constructor(
		private sgService: storageService,
		private serverService: serverService,
		private httpService: httpService,
		private reqOptService: requestOptionService){
	}


	setSelectedRole(role){
		this.sgService.setItem('public','role',role);
		this.selectedRole = role;
		this.setClientContent();
	}
	private getCompanyToSignedIn(id){
		let signedInCompany = this.getCompanyById(id);
		if(signedInCompany && signedInCompany.companyType === 1){
			return id;
		}

		if(signedInCompany.parentId){
			return this.getCompanyToSignedIn(signedInCompany.parentId);
		}
		return null;
	}

	private setClientContent(){
		let signedInClientId = this.selectedCompany.id;
		let clientId = this.getCompanyToSignedIn(signedInClientId)
		let companyRoleValue = {
			signedInClientId: signedInClientId,
			clientId: clientId,
			permissionClientId: this.selectedRole.clientId,
			permissionRoleId: this.selectedRole.key,
			companyCode: this.selectedCompany.code
		}
		this.sgService.setItem('public','clientContext',companyRoleValue);
		this.httpService.set('Client-Context',JSON.stringify(companyRoleValue));
	}

	public setSelectCompany(company){
		this.reqOptService.setCompanyCode(company.code);
		this.selectedCompany = company;
		this.sgService.setItem('public','company',company);
	}

	public getSelectCompany(){
		let company = this.sgService.getItem('public','company');
		return  this.selectedCompany || company;
	}

	private getCompanyById(id,companies?:any){
		let company;
		if(!companies){
			companies = this.companies;
		}
		for(let i=0; i<companies.length; i++){
			company = companies[i];
			if(id == company.id){				
				return company;
			}else if(company.children && company.children.length > 0){
				company = this.getCompanyById(id,company.children);
				if(company){
					return company;
				}
			}
		}
		return false;
	}

	public getRoles(){
		let company = this.selectedCompany;
		let role    = this.sgService.getItem('public','role');
		return this.getRolesToCompany(company) || role;
	}

	private getRolesToCompany(company){			
		for(let i=0;i<this.roles.length; i++){
			let role = this.roles[i];
			if(company.id == role.clientId ){
				return this.getRoleName(role);
			}
		}

		if(company.parentId){
			company = this.getCompanyById(company.parentId);
			return this.getRolesToCompany(company);
		}

		return [];
	}

	private getRoleName(data){
		let roles:any = []
		data.roleIds.forEach(i => {
			this.rolesLookup.forEach(e=>{
					if(i == e.key){
					roles.push({
						value: e.value,
						key: i,
						clientId: data.clientId
					});
				}
			});			
		});
		return roles;
	}

	private extractData(res){
		this.companies   = res.companies;
		this.roles       = res.roles;
		this.rolesLookup = res.rolesLookup;
		this.companies.sort((x,y) => {
			return x.code > y.code ? 1 : -1;
		});
	}

	public getCompanies():Promise<any>{	
		let appServer  = this.serverService.getServer().appServer;	
		let url:string = `${appServer}/basics/company/getassignedcompanieswithroles`;
		return new Promise ((resolve,reject) => {
					this.httpService
						.get(url)
						.subscribe(res => {						
							this.extractData(res);
							resolve(this.companies);
						},err => {
							reject(err);
						});
					});
		}
	

	// checkCompany(params):Promise<any> {
	// 	return new Promise((resolve,reject) => {   
	// 	this.checkCompanyHttp(params)
	// 		.subscribe((res) =>{
	// 			if(res.data && res.data.isValid){
	// 				resolve(true);
	// 			}else{
	// 				reject(false);
	// 			}
	// 		},(err) => {
	// 			reject(false);
	// 		});
	// 	});
	// }

	// checkCompany(params){
	// 	let url = `
	// 				${this.appServer} 
	// 				/basics/company/checkcompany?
	// 				requestedCompanyId=${params.clientId}
	// 				&requestedSignedInCompanyId=${params.signedInClientId}
	// 				&requestedPermissionClientId=${params.permissionClientId}
	// 				&requestedRoleId=${params.roleId}
	// 			`;
	// 	return this.httpService
	// 				.get(url,this.httpOptions)
	// 					// .filter(res => {
	// 					// 	return !!res.data && res.data.isValid
	// 					// })
	// 					.map( res => {
	// 						return res;
	// 					});
	// }

	public getStatus(){
		return this.serverService.getStatus();
	}
}