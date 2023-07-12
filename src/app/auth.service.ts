import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import { UUIDModel } from './uuid';
import { BaseService } from './base.service';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleAuthProvider} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogged= new Subject();
  loggedUser:any=null;
  serverUrl="https://us-central1-hibabejelento-26e5a.cloudfunctions.net/api/";
  actionCodeSettings ={
     url:"http://localhost:4200/errorreport?uuid=",
    //url:"https://hibabejelento-26e5a.web.app/errorreport?uuid=",
    handleCodeInApp:true
  }

 
  constructor(private afAuth:AngularFireAuth, 
    private base:BaseService, 
     private http: HttpClient
     ,private router:Router) { 
   
  }

  signIn(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  getisLogged(){
    this.afAuth.authState.subscribe((user)=>{
      if (user)
      {
        this.loggedUser=user;
        // console.log("Hírdetve, belépés OK!", this.loggedUser)
        this.loggedUser.getIdToken().then((token:any) => {
          this.loggedUser.token=token;
          this.getClaims(this.loggedUser.uid).subscribe(
            {
            next:(c)=>{
              this.loggedUser.claims=c;
              console.log("Jogkörök: ",this.loggedUser.claims)
            },
            error:(e)=>console.log("Hiba a jogkörök lekérdezésénél, ",e)
          }
          )    
        }).catch((err:any) => {
          console.log("Hiba a token lekérésénél, ",err);
        });

      }
      else{
        this.loggedUser=null;
        // console.log("Hírdetve, belépés hiba, Kilépett? !")
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
        // console.log("Sikeres belépés", result)
      })
      .catch((e)=>console.log("Azonosítási hiba",e))
    }
  }
  signOut(){
    return this.afAuth.signOut();
  }


  forgotPassword(email:string){
    return this.afAuth.sendPasswordResetEmail(email);
  }

  setCustomClaims(uid:any, claims:any){
    const url=this.serverUrl+"setCustomClaims";    
    // const uid= this.userData.uid;
    // const claims = {admin:true};

    const body={uid, claims};
    console.log("uid:",uid);
    console.log("Claims", claims);
    const headers =
    new HttpHeaders().set('Authorization',this.loggedUser.token);
    this.http.post(url, body, {headers}).subscribe({
      next:()=>{
        // console.log("A claims beállítása sikeres!")
      },
      error:(err)=>{console.log("Hiba a Claims beállításakor: ", err)}
    })
  }

  getUsers(){
    const url=this.serverUrl+"users"; 
    const headers = 
    new HttpHeaders().set('Authorization',this.loggedUser.token);
    return this.http.get(url, {headers})
  }

  getClaims(uid:string){
    const url=this.serverUrl+`users/${uid}/claims`;
    console.log 
    const headers = 
    new HttpHeaders().set('Authorization',this.loggedUser.token);
    return this.http.get(url, {headers})
  }


  signUp(email:string, password:string){
    console.log(email,";", password);
    return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  googleAuth(){
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }
  sendVerificationEmail(){
    this.afAuth.currentUser
      .then((user)=>user?.sendEmailVerification())
      .then(()=>this.router.navigate(['/verifyemail']))
      .catch((error)=>alert(error.message))
  }
  isSuperAdmin(){
    // console.log("Sadmin: ",this.loggedUser.claims?.['superAdmin'])
    if (this.loggedUser && this.loggedUser.claims?.['superAdmin']!=undefined 
            && this.loggedUser.claims?.['superAdmin']) return true;
            return false;
  }
  isAdmin(){
    if (this.loggedUser && this.loggedUser.claims?.['admin']!=undefined 
            && this.loggedUser.claims?.['admin']) return true;
            return false;
  }
  isInformatikus(){
    if (this.loggedUser && this.loggedUser.claims?.['informatikus']!=undefined 
            && this.loggedUser.claims?.['informatikus']) return true;
            return false;
  }
  

}
