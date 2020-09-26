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
    Swal.fire( {title: mensaje, icon: icono});
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




}



