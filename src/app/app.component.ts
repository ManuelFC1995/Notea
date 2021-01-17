import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { Sensors, TYPE_SENSOR } from '@ionic-native/sensors/ngx';
declare var sensors;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  splash=true;
  light: any;
  DarkMode:boolean;
  
 
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authS:AuthService,
    private translate: TranslateService,
    private sensors: Sensors
   
  ) {

    this.initializeApp();

  }
  ngOnInit () {
   
    }

  initializeApp() {
  
    this.platform.ready().then(() => {
      this.translate.addLangs(['Español', 'English']);
      this.translate.setDefaultLang('Español');
      this.translate.use('Español' );
       this.initSensor();
      this.statusBar.styleDefault();
      this.splashScreen.show;
      this.splashScreen.hide;
      this.authS.init();
      this.ComprobarModoNoche();
     
    });
  }
ComprobarModoNoche(){
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  this.DarkMode=prefersDark.matches;
}

initSensor() {


  setInterval(() => {
    sensors.getState((values) => {
      this.light = values;
    });
  }, 300)
 
 if(this.light<=150){
   this.CambioTema();

 }
  
}

CambioTema(){
  this.DarkMode=!this.DarkMode;
document.body.classList.toggle('dark');
}

}
