import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CitasService } from 'src/app/services/citas/citas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private crud: CitasService) {

  }

  ngOnInit(): void {

  }




  async onSubmit(valores: NgForm): Promise<void> {
    if (valores.valid) {
      const {localizador} = valores.value;
      await this.crud.borrarCita(localizador);
      //valores.reset();
    }

  }


}
