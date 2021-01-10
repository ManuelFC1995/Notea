import { Injectable } from '@angular/core';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Nota } from '../model/nota';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotasService {
 
  private myCollection:AngularFirestoreCollection<any>;

  constructor(private google:GooglePlus,
    private authS:AuthService,private fire:AngularFirestore) { 
      this.myCollection=fire.collection<any>(environment.userCollection).doc(this.authS.getUser().userId).collection(environment.notasColletion);
  }
     
 /* ngOnInit(){
    if(this.authS.isLogged){
this.user=this.authS.user;
    }
  }
*/

loadCollection(){
  this.myCollection=this.fire.collection<any>(environment.userCollection).doc(this.authS.getUser().userId).collection(environment.notasColletion);
}
  agregaNota(nuevaNota:Nota ):Promise<any>{
   
    return this.myCollection.add(nuevaNota);
  }
  leeNotas():Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.myCollection.get();
  }
  leeNotas10():Observable<firebase.firestore.QuerySnapshot<firebase.firestore.DocumentData>>{
    return this.myCollection.get();
  }
  leeNota(id:any):Observable<any>{ 
    return this.myCollection.doc(id).get();
  }
  actualizaNota(id:any,nuevaNota:Nota):Promise<void>{
 
    console.log(nuevaNota)
    return this.myCollection.doc(id).update({titulo:nuevaNota.titulo,texto:nuevaNota.texto});
  }

 
  borraNota(id:any):Promise<void>{
    return this.myCollection.doc(id).delete();
  }
  //FIN CRUD BASICO
  leeNotasPorCriterio(){
    //Por implementar
  }


}
