import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router} from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    public auth: AngularFireAuth,
    public router: Router
    ) { }

  GoogleLogin(): Promise<any> {

    return new Promise<any>((resolve, reject) => {
      const provider = new firebase.auth.GoogleAuthProvider();
      // provider.addScope('profile');
      // provider.addScope('email');

      this.auth.signInWithPopup(provider).then(
        (UserCredential) => {
          resolve(UserCredential);
        }
      ).catch(
        (error) => {
          reject(error)
        }
      )

    })


  }


  logout():void {
    this.auth.signOut();
    localStorage.removeItem('uid');
    this.router.navigate(['/login']);   
  }

}








