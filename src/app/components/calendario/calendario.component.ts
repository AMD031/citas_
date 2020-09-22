import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular'

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {

  constructor() { }

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
    alert('date click! ' + arg.dateStr)
  }



  ngOnInit(): void {

  };




}


