import { Component, Input, OnInit } from '@angular/core';
import { Nota } from 'src/app/model/nota';
@Component({
  selector: 'app-info-nota',
  templateUrl: './info-nota.page.html',
  styleUrls: ['./info-nota.page.scss'],
})
export class InfoNotaPage implements OnInit {
  @Input('nota') nota:Nota;
   
  constructor() { }

  ngOnInit() {
  }

}
