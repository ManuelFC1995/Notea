import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AuthService } from '../services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  image: string;
  DarkMode:boolean;
  public user = {
    token: -1,
    name: '',
    
    avatar: ''
  }
  constructor(private google:GooglePlus,  private webView: WebView, private camera:Camera,
    private authS:AuthService,private router:Router
    ,
    private flash:Flashlight,
    public alertController: AlertController
    ) {

      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
      this.DarkMode=prefersDark.matches;
    }


    
  ngOnInit(){
    if(this.authS.isLogged()){
this.user=this.authS.user;
console.log("");

    }

  }

  
  public async logout(){
    await this.authS.logout();
    if(!this.authS.isLogged()){
      this.router.navigate(['/login'])
    }
  }

  ChangeAvatar(){

  }

Linterna(event){
  let encendido =event.target.checked;

  if (encendido){
this.flash.switchOn();
  }else{
this.flash.switchOff();
  }
}
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.image = this.webView.convertFileSrc(imageData);
    }, (err) => {
      console.log(err);
    });
  }
  takeGallery() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    this.camera.getPicture(options)
    .then((imageData) => {
      this.image = this.webView.convertFileSrc(imageData);
    }, (err) => {
      console.log(err);
    });
  }

  async presentAlertFotos() {
  
    const alert = await this.alertController.create({
      header: 'Atención!',
      message: 'Seguro que desea <strong>Borrar</strong> la nota ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Camara',
          handler: () => {
            this.takePicture();
          }
        },{
          text: 'Galeria',
          handler: () => {
            this.takeGallery();
          }
        }
      ]
    });
  
    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

  CambioTema(){
    this.DarkMode=!this.DarkMode;
document.body.classList.toggle('dark');
  }
}
