import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import { UUIDModel } from './uuid';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged= new Subject();
  loggedUser:any;

  actionCodeSettings ={
     url:"http://localhost:4200/errorreport?uuid=",
    //url:"https://hibabejelento-26e5a.web.app/errorreport?uuid=",
    handleCodeInApp:true
  }

 
  constructor(private afAuth:AngularFireAuth, private base:BaseService) { 
   
  }

  getisLogged(){
    this.afAuth.authState.subscribe((user)=>{
      if (user)
      {
        this.loggedUser=user;
        console.log("Hírdetve, belépés OK!")
      }
      else{
        this.loggedUser=null;
        console.log("Hírdetve, belépés hiba, Kilépett? !")
      }
      this.isLogged.next(this.loggedUser)
    })
    return this.isLogged
  }

  sendInEmailLink(email:any){
    const uuid=uuidv4();
    this.base.AddUUID(uuid);
  
    this.actionCodeSettings.url+=uuid;
    //window.localStorage.setItem('emailForSignIn', email);
    return this.afAuth.sendSignInLinkToEmail(email, this.actionCodeSettings)
  }
  
  signInEmailLink(){
    var email= window.localStorage.getItem("email");
    console.log("email",email);
    if (email)
    { 
      this.afAuth.signInWithEmailLink(email)
      .then((result)=>{
        window.localStorage.removeItem("email");
        console.log("Sikeres belépés", result)
      })
      .catch((e)=>console.log("Azonosítási hiba",e))
    }
  }
  signOut(){
    return this.afAuth.signOut();
  }


}
