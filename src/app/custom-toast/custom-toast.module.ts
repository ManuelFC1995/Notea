import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastController } from '@ionic/angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class CustomToastModule {
  toast;
  constructor(private toastCtrl: ToastController) { }

  async show(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
     
      position: 'bottom',
    
      duration: 5000
    });
    toast.present();
  }

  async showTop(msg, time?) {
    if (this.toast)
      this.toast.dismiss();
    if (!time) {
      this.toast = await this.toastCtrl.create({
        message: msg,

        position: 'top',
      
      });
      this.toast.present();
    } else {
      this.toast = await this.toastCtrl.create({
        message: msg,
      
        position: 'top',
      
        duration: time
      });
      this.toast.present();
    }
  }
}
