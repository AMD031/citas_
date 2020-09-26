import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';
import { CitasService } from 'src/app/services/citas/citas.service';

@Component({
   selector: 'app-signin',
   templateUrl: './signin.component.html',
   styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

   constructor(
      private login: LoginService,
      private router: Router,
      private crud: CitasService
      ) { }

   ngOnInit(): void {
   }

   async signIn() {
      try {
         let data = await this.login.GoogleLogin();

         const { credential } = data;
         const { idToken } = credential;
         const { user } = data;
         const { uid, displayName } = user;
         //console.log(data);
         //console.log('usuario:', uid, 'nombre:', displayName , "token", idToken);

         localStorage.setItem("uid", uid);
         localStorage.setItem("unombre", displayName);

         if (user) {
            this.router.navigate(['/calendario']);
            this.crud.registrarNuevoUsuario(uid);
         }

      } catch (error) {
         console.log(error);
      }

   }


}
