import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { ModalController, NavController } from '@ionic/angular/';
import { AuthService } from 'src/app/services/auth.service';

import { FormControl, FormGroup, FormBuilder, Validators } from
'@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
 
  loginForm: FormGroup;
  userdata: any;
  mensaje = false;
  constructor(private formBuilder: FormBuilder,private navCtrl: NavController,private google:GooglePlus,
    private authS:AuthService,private router:Router,  private modalController:ModalController,private activatedRouter: ActivatedRoute) { }

    ngOnInit() {
      console.log("ESTOY AQUI")
      console.log(this.authS.isLogged())
      if(this.authS.isLogged()){
        this.router.navigate(['/'])
      }
    }
  
    public async login(){
      let u=await this.authS.login();
      if(u.token!=-1){
        this.router.navigate(['/'])
      }
    }

  
}
