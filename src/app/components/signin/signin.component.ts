import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private login: LoginService,
              private router:Router) { }

  ngOnInit(): void {
  }

  async signIn(){
     try {
        let data = await this.login.GoogleLogin();
        const {user} = data;
        const {uid, displayName} = user;
        console.log('usuario:', uid, 'nombre:', displayName);
     } catch (error) {
        console.log(error);
     }
    
  }


}