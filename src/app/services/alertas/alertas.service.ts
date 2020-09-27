import { Injectable } from '@angular/core';

import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class AlertasService {

  constructor() { }

  /**
   * 
   * @param mensaje mensaje que se ra inyectado en la alerta,
   * @param icono los valores que puede tormar son: success, 	error, 	warning,	info, question
   */
  notificacion(mensaje: string, icono: string): void {
    Swal.fire({ title: mensaje, icon: icono });
  }

  mostrarCarga(titulo: string, html: string): void {
    Swal.fire({
      title: titulo,
      html: html,// add html attribute if you want or remove
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    })
  }


  ocultar(): void {
    Swal.close();
  }


  alertaBorrar() {

    return new Promise((resolve, reject) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'la cita será borrada',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, hazlo'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Boorado!',
            'Tu cita ha sido borrada.',
            'success'
          );
          resolve(true);
        }else{
          resolve(false);
        }
      });

    })


  }




}



