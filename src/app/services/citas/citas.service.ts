import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { data } from 'jquery';
import { throwError } from 'rxjs';
import { Cita } from 'src/app/components/model/cita';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private firestore: AngularFirestore) { }


  private makeid(length) {
    let result = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  crearCita(cita: Cita) {
    const uid = localStorage.getItem('uid');
    if (uid && cita) {
      this.firestore.collection(`citas/${uid}/cita`).add(cita).then(
        resp => {
          console.log(resp);
        }
      ).catch(
        error => console.log(error)
      );
    } else {
      return throwError("usuario no logeado");
    }
  }


  cargarCitas(){


    const uid = localStorage.getItem('uid');
    const snap = this.firestore.collection(`citas/${uid}/cita`).get();
    let citas:Array<any> = [];
    snap.forEach(
      (hijo) => {
         const data = hijo.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        
        citas.push(...data);
      })
  
      return citas;
      
      
  }























}
