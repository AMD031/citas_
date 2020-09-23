import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular'
import { CitasService } from 'src/app/services/citas/citas.service';
import { ModalComponent } from '../modal/modal.component';
import { Cita } from '../model/cita';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit, OnChanges {
  hora: string;
  fecha: string;
  citas: Array<any> = [];
  calendarOptions: CalendarOptions;
  constructor(public dialog: MatDialog,
    private crud: CitasService
  ) {

  }
 


  // title = 'angular-material-modals';

  // city: string;
  // name: string;
  // food_from_modal: string;






  handleDateClick(arg) {
    //alert('date click! ' + arg.dateStr);
    this.fecha = arg.dateStr.toString();
    if (this.fecha) {
      this.openDialog();
    }


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: 'auto',
      //  data: { name: this.name, animal: this.city }
    });

    dialogRef.afterClosed().subscribe(result => {
      //console.log('The dialog was closed');
      if (result) {
        //console.log('The dialog was closed', result);
        // this.city = result;
        // this.food_from_modal = result.food;
        if(result.hora){
          this.hora = result.hora;
        }
     
      }

      const cita: Cita = {
        fecha: this.fecha,
        hora: this.hora
      };
      this.crud.crearCita(cita);
      this.cargarDatos();

    });
  }




  private async cargarDatos() {
    try {
      this.citas = await this.crud.cargarCitas();
      this.citas = this.citas.map(
        (cita) => ({
          title: cita.hora, date: cita.fecha
        })
      )
   
      this.calendarOptions.events = this.citas;
      

  

    } catch (error) {
      console.log(error);
    }
  }




  ngOnInit(): void {
    this.calendarOptions = {

      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this), // bind is important!
          events: [
        // { title: '08:00', date: '2020-09-22', color: `${false ? "green" : "red"}` },
        // { title: '09:00', date: '2020-09-22' },
      ]
    };
    this.cargarDatos();
  }



  ngOnChanges(changes: any): void {

    console.log("cambio",changes)
    
  }




}


