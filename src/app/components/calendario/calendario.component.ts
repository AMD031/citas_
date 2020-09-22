import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular'
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  title = 'angular-material-modals';

  // city: string;
  // name: string;
  // food_from_modal: string;
  hora:string;

 
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: this.handleDateClick.bind(this), // bind is important!
    events: [
      { title: '08:00', date: '2020-09-22', color:`${ false ? "green" : "red"  }` },
      { title: '09:00', date: '2020-09-22' },
      { title: '10:00', date: '2020-09-22' }
    ]
  };

  handleDateClick(arg) {
    // alert('date click! ' + arg.dateStr);
    console.log(arg.dateStr);
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: 'auto',
      //  data: { name: this.name, animal: this.city }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed')

      if(result){
        console.log('The dialog was closed', result);
        // this.city = result;
        // this.food_from_modal = result.food;
        this.hora = result.hora;
      }
    });
  }

  ngOnInit(): void {

  };




}


