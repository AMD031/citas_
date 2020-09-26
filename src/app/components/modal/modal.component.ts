import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertasService } from 'src/app/services/alertas/alertas.service';
import { CitasService } from 'src/app/services/citas/citas.service';

@Component({
  selector: 'app-my-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  //  food: string;

  
  fecha: string;
  mostrar: boolean[] = [];
  constructor(
    public alerta: AlertasService ,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private crud: CitasService) {
    this.fecha = data.fecha;
    this.arrayCitas().then(
      (array) => {
        this.mostrar = array;
      }
    )
  }

  async arrayCitas() {
    
    const resultado = await this.crud.buscaCitas([
      { hora: '8:00', fecha: this.fecha },
      { hora: '9:00', fecha: this.fecha },
      { hora: '10:00', fecha: this.fecha }
    ]);
    console.log(resultado);
    this.alerta.ocultar();
    return resultado;

  }

  // onNoClick(): void {
  //   this.dialogRef.close({
  //     food: this.food
  //   });
  // }

  obtenerHora(hora: string): void {
    //this.arrayCitas();
    console.log('data', this.data);
    this.dialogRef.close({
      hora
    });
  }

  
  Cancelar(): void {
    this.data = {};
    this.dialogRef.close({});
  }
}
