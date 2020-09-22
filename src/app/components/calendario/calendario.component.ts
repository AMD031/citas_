import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions, EventApi } from '@fullcalendar/angular'
import { CitasService } from 'src/app/services/citas/citas.service';
import { ModalComponent } from '../modal/modal.component';
import { Cita } from '../model/cita';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {
  hora:string;
  fecha:string;
  citas: Array<any> = [];

  constructor(  public dialog: MatDialog,
                private crud:CitasService
    ) { }

  // title = 'angular-material-modals';

  // city: string;
  // name: string;
  // food_from_modal: string;

 
  calendarOptions: CalendarOptions = {

    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    

    events: [
      // { title: '08:00', date: '2020-09-22', color:`${ false ? "green" : "red"  }` },
      // { title: '09:00', date: '2020-09-22' },
      // { title: '10:00', date: '2020-09-22' }

      // {title: this.citas[0].hora, fecha: this.citas[0].fecha}

    ]
  };


 
  handleDateClick(arg) {
     alert('date click! ' + arg.dateStr);
    this.fecha = arg.dateStr.toString();
    if(this.fecha){
      this.openDialog();
    }

 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: 'auto',
      //  data: { name: this.name, animal: this.city }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('The dialog was closed');
      if(result){
        console.log('The dialog was closed', result);
        // this.city = result;
        // this.food_from_modal = result.food;
        this.hora = result.hora;
      }

      console.log("fff",this.fecha);
      const cita:Cita = {
        fecha: this.fecha,
        hora: this.hora
     };
     
     

     console.log('cita',cita);
     this.crud.crearCita(cita);

    });
  }

  ngOnInit(): void {
    console.log( this.crud.cargarCitas())


  };




}


