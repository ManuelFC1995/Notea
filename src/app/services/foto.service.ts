import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AngularFirestore } from 'angularfire2/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FotoService {
  image: string;
  constructor( private google:GooglePlus,
    private authS:AuthService,private fire:AngularFirestore) { 

    }

    
}

