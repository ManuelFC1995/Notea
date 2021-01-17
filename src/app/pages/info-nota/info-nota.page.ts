import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Nota } from 'src/app/model/nota';
import { Platform, NavController } from '@ionic/angular';
@Component({
  selector: 'app-info-nota',
  templateUrl: './info-nota.page.html',
  styleUrls: ['./info-nota.page.scss'],
})
export class InfoNotaPage implements OnInit {
  @Input('nota') nota:Nota;
   
  constructor(private platform: Platform,
    private navCtrl: NavController, private router:Router) { }

  ngOnInit() {
  }
  atras(){
    this.router.navigate([""]);
  }
}
