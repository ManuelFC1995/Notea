import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  splash=true;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS:AuthService
  ) {
    this.initializeApp();
  }
  ngOnInit () {
   
    }

  initializeApp() {
  
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.show;
      this.splashScreen.hide;
      this.authS.init();
      this.ComprobarModoNoche();
     
    });
  }
ComprobarModoNoche(){
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
}


}
