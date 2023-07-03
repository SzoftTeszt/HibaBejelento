import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import { UUIDModel } from './uuid';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  actionCodeSettings ={
    // url:"http://localhost:4200/errorreport?uuid=",
    url:"https://hibabejelento-26e5a.web.app/errorreport?uuid=",
    handleCodeInApp:true
  }

 
  constructor(private afAuth:AngularFireAuth, private base:BaseService) { 
   
  }

  singInEmailLink(email:any){
    const uuid=uuidv4();
    this.base.AddUUID(uuid);
  
    this.actionCodeSettings.url+=uuid;
    return this.afAuth.sendSignInLinkToEmail(email, this.actionCodeSettings)
  }
}
