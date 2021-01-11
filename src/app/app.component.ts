import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';



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
    private authS:AuthService,
    private translate: TranslateService
   
  ) {

    this.initializeApp();

  }
  ngOnInit () {
   
    }

  initializeApp() {
  
    this.platform.ready().then(() => {
      this.translate.addLangs(['es', 'en']);
      this.translate.setDefaultLang('es');
      this.translate.use('es' );
 
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
