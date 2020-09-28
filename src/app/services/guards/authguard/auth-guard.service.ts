import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRoute, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { auth } from 'firebase';
import { LoginService } from '../../auth/login.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private login: LoginService

  ) { }
  public canActivate() {
    if (!localStorage.getItem('uid')) //
    {
      console.log('Usted no posee permisos para acceder a esta ruta');
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }

 



}