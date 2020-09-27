
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { storage } from 'firebase';
import { map } from 'jquery';
import { Cita } from 'src/app/model/cita';


@Injectable({
  providedIn: 'root'
})
export class CitasService {

  constructor(private firestore: AngularFirestore) { }


  // private makeid(length) {
  //   let result = '';
  //   let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   let charactersLength = characters.length;
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }



  async registrarNuevoUsuario(uid: string): Promise<void> {
    const ref = this.firestore.firestore.collection(`uid`);
    const resultado = ref.where('uid', '==', uid).get();
    const resp = (await resultado).docs.map(val => val.data().uid);
    if (!(resp.indexOf(uid) > -1)) {
      ref.add({ uid });
    }
  }

  private async obtenerTodosLosUsuario(): Promise<any> {

    try {
      const ref = this.firestore.firestore.collection(`uid`).get();
      return (await ref).docs.map(usuario => usuario.data().uid);
    } catch (error) {
      console.log(error);
    }
  }



  async crearCita(cita: Cita): Promise<any> {

    return new Promise(async (resolve, rejects) => {
      const uid = localStorage.getItem('uid');
      if (uid && cita) {
        try {
          // console.log((await this.buscaCita(cita)));
          if ((await this.buscaCita(cita)) === false) {
            await this.firestore.collection(`citas/${uid}/cita`).add(cita).then(
              (resp) => {
                const idr = resp.id;
                resp.update({ ...cita, id: idr });
                resolve(idr);
              });
          };

        } catch (error) {
          console.log(error);
        }
      } else {
        throw new Error('usuario no logeado');
      }
    });



  }




  async cargarCitas(): Promise<Array<any>> {
    const uid = localStorage.getItem('uid');
    const snap = this.firestore.collection(`citas/${uid}/cita`).get();
    return new Promise((resolve, rejects) => {
      snap.forEach(
        (hijo) => {
          const citas = hijo.docs.map((doc) => (
            { ...doc.data(), id: doc.id }
          ));
          resolve(citas);

          if (!citas) {
            rejects([])
          }
        })

    })
  }


  async buscaCitas(citas: Array<Cita>): Promise<Array<boolean>> {
    return new Promise(async (resolve, reject) => {
      const resultado = await this.todasLasCitas();
      const respuestaPromesa: Array<boolean> = [];

      citas.forEach((cita) => {
        const resul = resultado.filter((citaI) => citaI.hora === cita.hora && citaI.fecha === cita.fecha);
        if (resul.length === 1) {
          respuestaPromesa.push(false);
        } else {
          respuestaPromesa.push(true);
        }
        resolve(respuestaPromesa);
      })




    });
  }




  async buscaCita(cita: Cita): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const resultado = await this.todasLasCitas();
      const resul = resultado.filter((citaI) => citaI.hora === cita.hora && citaI.fecha === cita.fecha);

      //console.log('resul', resul);
      if (resul.length > 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  }





  async todasLasCitas(): Promise<Array<any>> {
    return new Promise(async (resolve, rejects) => {
      try {
        const usuarios = await this.obtenerTodosLosUsuario();
        let resultado: Array<any> = [];
        if (usuarios) {
          usuarios.forEach(
            async (valor, index) => {
              const snap = this.firestore.firestore.collection(`citas/${usuarios[index]}/cita`).get();
              const citas = (await snap).docs.map(citas => citas.data());
              //console.log('entrada', citas)
              if (index === 0) {
                resultado = [...citas];
                // console.log('fucion', resultado);
              } else {
                resultado = [...resultado, ...citas];
                // console.log('fucion2', resultado);
              }

              if ((index + 1) >= usuarios.length) {
                //console.log('todas las citas', resultado);
                resolve(resultado);
              }
            });
        }

      } catch (error) {
        console.log(error);
      }
    });
  }


  async borrarCita(id: string): Promise<any> {
    return new Promise( async (resolve, reject) => {
      const uid = localStorage.getItem('uid');
      console.log('uid', uid);
      const valor = (await this.firestore.firestore.collection(`citas/${uid}/cita`).doc(id.trim()).get()).data();

      this.firestore.firestore.collection(`citas/${uid}/cita`).doc(id.trim()).delete().then(() => {
        resolve(valor);
      }).catch((error) => {
        console.error('Error', error);
      });


    });



  }




}













