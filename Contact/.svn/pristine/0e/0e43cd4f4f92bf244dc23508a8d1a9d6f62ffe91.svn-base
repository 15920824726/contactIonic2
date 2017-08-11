import { Injectable } from '@angular/core';
import { storageService } from './storage.service';

export class Server {
	public appServer:string;
	public identityServer:string;
}

@Injectable()
export class serverService {
	private appServer: string = 'https://itwo40-int.rib-software.com/itwo40/Daily/services';
	private identityServer: string = 'https://itwo40-int.rib-software.com/itwo40/daily/identityserver';
	private status;
	private url: string;
	constructor(private sgService: storageService){
		this.init();
	}

	private init(): void{
		let server:any = this.sgService.getItem('public','server');
		if(server){
			this.appServer      = server.appServer;
			this.identityServer = server.identityServer;
		}
	}

	public getUrl():string{
		this.url = this.appServer + '/businesspartner/main/contact/mobility/';
		return this.url;
	}

	public setStatus(status): void{
		this.status = status;
	}

	public getStatus(): any{
		return this.status;
	}

	public getServer():any {
		let server:Server = {
			appServer: this.appServer,
			identityServer: this.identityServer
		};
		return server;
	}

	public setServer(server):void {
		this.appServer      = server.appServer;
		this.identityServer = server.identityServer;
		this.sgService.setItem('public','server',server);
	}
}
