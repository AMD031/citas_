import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cita } from 'src/app/model/cita';
import { AlertasService } from 'src/app/services/alertas/alertas.service';
import { LoginService } from 'src/app/services/auth/login.service';
import { CitasService } from 'src/app/services/citas/citas.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  citaDesdeHijo: Cita;
  constructor(
    private crud: CitasService,
    private alerta: AlertasService,
    private login: LoginService
  ) {

  }


  ngOnInit(): void {

  }


  salir(){
    this.login.logout();
  }


  async onSubmit(valores: NgForm): Promise<void> {
    if (valores.valid) {
      const { localizador } = valores.value;
      if (this.alerta.alertaBorrar()) {
        try {
          this.alerta.mostrarCarga('Espere', ' Realizando operación');
          this.citaDesdeHijo = await this.crud.borrarCita(localizador);
          this.alerta.ocultar();
        } catch (error) {
          this.alerta.ocultar();
        }

      }
      valores.reset();
    }

  }


}
