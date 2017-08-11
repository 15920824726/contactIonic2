import { Component, ViewChild } from '@angular/core';
import { Platform, Nav} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Broadcaster } from '../core/providers/broadcaster.service';
import { tokenService } from '../core/providers/token.service';
import { server } from '../pages/setting/server/server';


@Component({
  templateUrl: 'app.html'
})
export class Contact {
  user: any;
  @ViewChild(Nav) nav: Nav;

  // make ServerPage the root (or first) page
  rootPage = server;

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private broadcaster: Broadcaster,
    private tkService: tokenService) {
    this.initializeApp();
    this.broadcaster.on<any>('serverInvalid')
        .subscribe( data => {
          this.tkService.logout();
          this.nav.setRoot(server);
        });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
