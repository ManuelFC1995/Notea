import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Nota } from '../model/nota';
import { EditNotaPage } from '../pages/edit-nota/edit-nota.page';
import { NotasService } from '../services/notas.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading.service';
import { InfoNotaPage } from '../pages/info-nota/info-nota.page';
import { Vibration } from '@ionic-native/vibration/ngx';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page{

  public listaNotas = [];
textoBuscar='';
  constructor(private notasS: NotasService,
    private modalController:ModalController,
    private nativeStorage: NativeStorage,
    private authS:AuthService,
    private router:Router,
    public alertController: AlertController,
    private LoadingS:LoadingService,private vibration: Vibration,public  translate: TranslateService) { }


  ngOnInit(){  
    this.cargaDatos();
   
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }

  ionViewDidEnter() {
    
    this.notasS.loadCollection();
    this.cargaDatos();
 
  }

  public  async cargaDatos($event=null){
  
    await this.LoadingS.presentLoading();

    try {
      this.LoadingS.loadingController.dismiss();
      this.notasS.leeNotas()
        .subscribe((info:firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>) => {
          //Ya ha llegado del servidor
         
          this.listaNotas=[];
          info.forEach((doc)=>{
            let nota={
              id:doc.id,
              ...doc.data()
            }
       
            this.LoadingS.loadingController.dismiss();
 this.listaNotas.push(nota);
          
          
          });
     
          console.log(this.listaNotas);
          if($event){
        
            $event.target.complete();
         
          }
        })
    } catch (err) {
      //Error
    }
  }
  public async borraNota(id:any){
    await this.LoadingS.presentLoading();
    this.LoadingS.loadingController.dismiss();
    this.notasS.borraNota(id)
    .then(()=>{
      //ya está borrada allí
      let tmp=[];
      this.listaNotas.forEach((nota)=>{     
        if(nota.id!=id){
         tmp.push(nota);
        }
      })
      this.listaNotas=tmp;
      this.LoadingS.loadingController.dismiss();
      this.vibration.vibrate(1000);
    })
    .catch(err=>{
      this.LoadingS.loadingController.dismiss();
      this.vibration.vibrate(1000);
    })
  }
  public async editaNota(nota:Nota){
    const modal = await this.modalController.create({
      component: EditNotaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });
    return await modal.present();
  }
  public async infoNota(nota:Nota){
    const modal = await this.modalController.create({
      component: InfoNotaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        nota:nota
      }
    });
    return await modal.present();
  }

   async presentAlertConfirmDelete(id:any) {
  
      const alert = await this.alertController.create({
        header:  this.translate.instant("Atención!"),
        message: this.translate.instant("Seguro que desea Borrar la nota?"),
        buttons: [
          {
            text: this.translate.instant("cancelar"),
            role: 'cancel',
            cssClass: 'secondary',
            handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text:  this.translate.instant("Borrar"),
            handler: () => {
              
              this.borraNota(id);
            }
          }
        ]
      });
    
      await alert.present();
      let result = await alert.onDidDismiss();
      console.log(result);
    }

    Buscar(event){
this.textoBuscar=event.detail.value;
    }

    LoadNotas(event){

setTimeout(()=>{
this.cargaDatos()
event.Target.complete();
},100);

    }
   }



