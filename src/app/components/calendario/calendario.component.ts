import { Component, OnChanges, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular'
import * as moment from 'moment';
import { AlertasService } from 'src/app/services/alertas/alertas.service';
import { CitasService } from 'src/app/services/citas/citas.service';
import { ModalComponent } from '../modal/modal.component';
import { Cita } from '../../model/cita';

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
  constructor(
    public dialog: MatDialog,
    private crud: CitasService,
    private alerta: AlertasService
  ) {

  }


  private comprobarFecha(fecha: string): boolean {
    const diaElegido = moment(this.fecha);
    const ahora = moment(Date.now()).format('YYYY-MM-DD');
    return diaElegido.isSameOrAfter(ahora);
  }

  handleDateClick(arg): void {

    // alert('date click! ' + arg.dateStr);
    this.fecha = arg.dateStr.toString();
    if (this.fecha) {

      if (this.comprobarFecha(this.fecha)) {
        this.alerta.mostrarCarga('Espere', 'Cargando citas disponibles');
        this.openDialog();
      } else {
        this.alerta.notificacion('No se puede pedir citas de días que ya ha pasado', 'info');
      }

    }


  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: 'auto',
      data: { fecha: this.fecha }
    });


    dialogRef.afterClosed().subscribe((result) => {



      if (result?.hora) {
        this.hora = result.hora;
      } else {
        this.hora = null;
      }

      const cita: Cita = {
        fecha: this.fecha,
        hora: this.hora
      };
      if (cita.fecha && cita.hora) {
        this.crud.crearCita(cita).then(resp => {
          if (resp) {
            this.citas.push({ title: cita.hora, date: cita.fecha });
            this.calendarOptions.events = [...this.citas];
            this.alerta.notificacion(`su localizador es: ${resp} `, 'info')
          }
        }).catch(
          (error) => console.log(error)
        );
      }
    });
  }

  borrarCitaInterfaz(cita: Cita): void {
    if (cita.fecha && cita.hora) {
      const citasFiltradas = this.citas.filter(
        (citaI) =>  !(citaI.title ===  cita.hora && citaI.date === cita.fecha)
      );
      this.calendarOptions.events = [...citasFiltradas];
    }


  }




  private async cargarDatos(): Promise<void> {
    try {
      // await this.actulizarEventos();
      this.citas = await this.crud.cargarCitas();
      this.citas = this.citas.map(
        (cita) => ({
          title: cita.hora, date: cita.fecha
        }));

      this.calendarOptions.events = this.citas;

  
      
      this.alerta.ocultar();
    } catch (error) {
      this.alerta.ocultar();
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
      ],
      locale: 'es'

    };
    this.alerta.mostrarCarga('Espere', 'Cargando toda sus citas')
    this.cargarDatos();

   


  }



  ngOnChanges(changes: any): void {
  }




}


