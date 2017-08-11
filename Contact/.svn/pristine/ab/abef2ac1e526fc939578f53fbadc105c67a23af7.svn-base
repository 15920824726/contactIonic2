import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

import { deviceService } from '../../../core/providers/device.service';
import { toastService } from '../../../core/providers/toast.service';
import { mapService } from './map.service';
declare var google;

@Component({
	templateUrl:'map.html'
})
export class map {
	private options: any;
	public  map: any;
	private translation: any;
	public  icons: any;

	constructor(
		private tlService: TranslateService,
		private navParams: NavParams,
		private tsService: toastService,
		private mapService: mapService,
    private dvService: deviceService){

	}

	getGooglePlugin(key){
		let that   = this;
		let googleMap = document.getElementById('googleMap');
		if(!googleMap){
			let script = document.createElement("script");

		    script.type = "text/javascript";
		    script.src  = `http://maps.google.cn/maps/api/js?key=${key}`;
		    script.id   = 'googleMap';

		    script.onload = function(){
	           that.mapCanvas();
	        };
			document.body.appendChild(script);
		}else{
			that.mapCanvas();
		}
	}

	mapCanvas(){
		if(this.options.latitude && this.options.longitude){
            this.getLocationByLatitude();
        }else{
            this.getLocationByGeocoding();
        }
	}

	getMapKey(){
		this.mapService
			.getMapKey()
			.then(res => {
				let key = res.GoogleKey;
				this.getGooglePlugin(key);
			}, err => {
				console.error(err);
			});
	}

	getLocationByLatitude(){
		let latitude  = this.options.latitude;
		let longitude = this.options.longitude;
        let minZoomLevel = 15;

		let map = new google.maps.Map(document.getElementById('mapCanvas'), {
			zoom: minZoomLevel,
			center: new google.maps.LatLng(latitude, longitude),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});

		let marker = new google.maps.Marker({
                position: new google.maps.LatLng(latitude,longitude),
                map: map
            });

        marker.setMap(map);
    }
	getLocationByGeocoding(){
		let that = this;
		let address = this.options.addressLine;
    	let mapCanvas = document.getElementById('mapCanvas');
    	let imgData = this.icons.noMap;
    	var map = new google.maps.Map(mapCanvas, {
      	zoom: 15
    	});
    	var geocoder = new google.maps.Geocoder();
      	// var address='CN 510000 Guangzhou, Guangzhou LiWan District Liwan Road No.88 Room 815';
      	geocoder.geocode({'address': address}, function(results, status) {
          if (status == 'OK') {
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                  map: map,
                  position: results[0].geometry.location
              });
              marker.setMap(map);

          } else {
            mapCanvas.innerHTML = `
                                    <div class="no-data">
                                      <img src="${imgData}" class="no-data-img">
                                      <p>${that.translation.noMapData}</p>
                                    </div>
                                  `;
            that.tsService.warning(that.translation.failure + ':' + status);
          }
      	});
    	}

    langScope(data){
    	this.translation = {
    		failure: data.map.failure,
        	noMapData: data.common.noMapData
    	}
    }

	ngOnInit(){
		let translation = this.tlService.getTranslation(this.tlService.currentLang);
		translation.subscribe(data => {
			this.langScope(data);
		});
		this.options = this.navParams.get('map');
    	this.icons = this.dvService.iconData;
		this.getMapKey();
	}
}
