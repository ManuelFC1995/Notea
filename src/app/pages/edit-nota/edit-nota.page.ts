import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AlertController, LoadingController, ModalController, ToastController } from '@ionic/angular';
import { Nota } from 'src/app/model/nota';
import { LoadingService } from 'src/app/services/loading.service';
import { NotasService } from 'src/app/services/notas.service';
import { Platform, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-edit-nota',
  templateUrl: './edit-nota.page.html',
  styleUrls: ['./edit-nota.page.scss'],
})
export class EditNotaPage{

  @Input('nota') nota:Nota;

  public tasks:FormGroup;

  constructor(private platform: Platform,
    private navCtrl: NavController,
    private formBuilder:FormBuilder,
    private notasS:NotasService, public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,public LoadingS:LoadingService,
    private modalController:ModalController, private webView: WebView, private camera:Camera, private router:Router
  ) {
    this.tasks=this.formBuilder.group({
      title:['',Validators.required],
      description:['']
    })
  }
  ionViewDidEnter(){
    this.tasks.get('title').setValue(this.nota.titulo);
    this.tasks.get('description').setValue(this.nota.texto);
    
  }
Guardar(){
  
}
  public async sendForm(){
 
    await this.LoadingS.presentLoading();
    let data:Nota={
      titulo:this.tasks.get('title').value,
      texto:this.tasks.get('description').value,
     
    }
    this.notasS.actualizaNota(this.nota.id,data)
    .then((respuesta)=>{
     
      this.presentToast("Nota guardada","success");
      this.modalController.dismiss();
      this.LoadingS.loadingController.dismiss();
     
    })
    .catch((err)=>{
   
      this.LoadingS.loadingController.dismiss();
      this.presentToast("Error guardando nota","danger");
      console.log(err);
    })
  }

  public async sendFormFoto(){
    await this.presentLoading();
    
    let data:Nota={
      titulo:this.tasks.get('title').value,
      texto:this.tasks.get('description').value,
      imagen: this.nota.imagen
    }
    this.notasS.actualizaNota(this.nota.id,data)
    .then((respuesta)=>{
      this.loadingController.dismiss();
      this.presentToast("Nota guardada","success");
      this.modalController.dismiss();
    })
    .catch((err)=>{
      this.loadingController.dismiss();
      this.presentToast("Error guardando nota","danger");
      console.log(err);
    })
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
      this.nota.imagen = this.webView.convertFileSrc(imageData);
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
      this.nota.imagen= this.webView.convertFileSrc(imageData);
    }, (err) => {
      console.log(err);
    });

  }

  async presentAlertFotos() {
  
    const alert = await this.alertController.create({
      header: 'Avatar',
      message: 'Elija una opcion ',
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


atras(){
  this.navCtrl.back();
}

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: '',
      spinner:'crescent'
    });
    await loading.present();
  }
  async presentToast(msg:string,col:string) {
    const toast = await this.toastController.create({
      message: msg,
      color:col,
      duration: 2000,
      position:"middle"
    });
  
    toast.present();
  }

}
