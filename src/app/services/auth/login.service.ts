import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(public auth: AngularFireAuth) { }

  GoogleLogin() { 

    return new Promise < any > ((resolve, reject) => {  
      let provider = new firebase.auth.GoogleAuthProvider();  
      //provider.addScope('profile');  
      //provider.addScope('email');  

      this.auth.signInWithPopup(provider).then(
        (UserCredential)=>{
           resolve(UserCredential);
        }
      ).catch(
        (error)=>{
            reject(error)
        }
      )

    })


  }

} 
  






