import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-my-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent {
  
 food: string;

  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    // onNoClick(): void {
    //   this.dialogRef.close({
    //     food: this.food
    //   });
    // }
 
    obtenerHora(hora:string):void{
      this.dialogRef.close({
          hora
      });
    }


}