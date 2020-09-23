import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
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


  cargarCitas():Promise<Array<any>> {

    const uid = localStorage.getItem('uid');
    const snap = this.firestore.collection(`citas/${uid}/cita`).get();

    return new Promise((resolve, rejects) => {
      
      snap.pipe().forEach(
        (hijo) => {
          const citas = hijo.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
          ));
          resolve(citas);

          if(!citas){
              rejects([])
          }

        })

      

    })








  }





















}
