import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  actionCodeSettings ={
    url:"http://localhost:4200/errorreport?uuid=",
    handleCodeInApp:true
  }
  public uuids:any=[]
  constructor(private afAuth:AngularFireAuth) { }

  singInEmailLink(){
    const uuid=uuidv4();
    this.uuids.push(uuid);
    this.actionCodeSettings.url+=uuid;
    return this.afAuth.sendSignInLinkToEmail("jagerattila@gmail.com", this.actionCodeSettings)
  }
}
