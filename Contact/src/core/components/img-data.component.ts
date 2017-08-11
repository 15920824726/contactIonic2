import { Component, Input } from '@angular/core';
import { deviceService } from '../../core/providers/device.service';

@Component({
  selector: 'img-data',
  template: `<img src={{imgSrc}} width="{{width}}">`
})
export class ImgComponent {
  @Input('dataUrl') dataUrl: any;
  @Input('width') width: number;
  public imgSrc: any;
  
  constructor(
    private dvService: deviceService) {

  }

  ngOnChanges(changes) {
    this.readImage();
  } 

  readImage() {
    if (this.dataUrl) {
      if (this.dataUrl.substr(0,4) == 'data') {
        this.imgSrc = this.dataUrl;
      } else {
        this.dvService.readImage(this.dataUrl)
          .then((data) => {
            console.log(data);
            this.imgSrc = 'data:image/jpeg;base64,' + data;
          }, (error) => {
            this.readImage();
          });
      }
    }
  }
}