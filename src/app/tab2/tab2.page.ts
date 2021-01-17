import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { LoadingService } from '../services/loading.service';
import { NotasService } from '../services/notas.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public tasks:FormGroup;
  image: string="";
  constructor(
    private LoadingS:LoadingService,
    private formBuilder:FormBuilder,
    private notasS:NotasService,
    private webView: WebView, private camera:Camera
  ) {
    this.tasks=this.formBuilder.group({
      title:['',Validators.required],
      description:[''],
    
    })
  }

  public async sendForm(){
    await this.LoadingS.presentLoading();
    
    let data:Nota={
      titulo:this.tasks.get('title').value,
      texto:this.tasks.get('description').value,
     

    }
    this.notasS.agregaNota(data)
    .then((respuesta)=>{
      this.tasks.setValue({
        title:'',
        description:''
      })
      this.LoadingS.loadingController.dismiss();
      this.LoadingS.presentToast("Nota guardada","success");
    })
    .catch((err)=>{
      this.LoadingS.loadingController.dismiss();
      this.LoadingS.presentToast("Error guardando nota","danger");
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
      this.image = this.webView.convertFileSrc(imageData);
    }, (err) => {
      console.log(err);
    });
  }

}
