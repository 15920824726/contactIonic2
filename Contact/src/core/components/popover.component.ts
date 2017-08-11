import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';

@Component({
  template: `
    <div *ngFor="let p of popoList;let i = index" (click)="close(p)" tappable class="item-block item-md" [ngClass]="i!=popoList.length-1?'bb':''">
      <ion-label color="{{p.checked?'primary':''}}">{{p.name}}</ion-label>
      <ion-icon name="md-checkmark" class="fr" color="primary" item-right *ngIf="p.checked" padding-right></ion-icon>
    </div>
  `
})
export class PopoverComponent {
  popoList: Array<any>;

  constructor(
    public viewCtrl: ViewController) {
      this.popoList = this.viewCtrl.data;
  }

  public close(p): void {
    this.viewCtrl.dismiss(p);
    if(p['$loki']) {
      this.select(p);
    }
  }

  public select(p): void {
    this.popoList.forEach(function(e) {
      if (e == p) {
        e.checked = 1;
      } else {
        e.checked = 0;
      }
    });
  }
}