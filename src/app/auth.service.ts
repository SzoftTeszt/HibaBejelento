import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { v4 as uuidv4 } from 'uuid';
import { UUIDModel } from './uuid';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GoogleAuthProvider} from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  filterUsers:any;
  users:any;
  filterUsersSubject=new Subject();

  loggedUser:any=null;
  isLogged= new BehaviorSubject<any>(this.loggedUser);
  
  isLoggedUserObservable = new Observable();

  informatikus=false;
  isInformatikus =new BehaviorSubject<boolean>(this.informatikus);

  superAdmin=false;
  isSuperAdmin =new BehaviorSubject<boolean>(this.superAdmin);

  serverUrl="https://us-central1-hibabejelento-26e5a.cloudfunctions.net/api/";
  // serverUrl="127.0.0.1:5001/";
  actionCodeSettings ={
    //  url:"http://localhost:4200/errorreport?uuid=",
    url:"https://hibabejelento-26e5a.web.app/errorreport?uuid=",
    handleCodeInApp:true
  }

 
  constructor(private afAuth:AngularFireAuth, 
    private base:BaseService, 
     private http: HttpClient
     ,private router:Router) { 

      this.isLoggedUserObservable=this.afAuth.authState

      this.afAuth.authState.subscribe((user)=>{
        if (user)
        {
          this.filterUsers=[];
          this.loggedUser=user;
          console.log("Hírdetve, belépés OK!", this.loggedUser)
          this.loggedUser.getIdToken().then((token:any) => {
            this.loggedUser.token=token;
            this.getClaims(this.loggedUser.uid).subscribe(
              {
              next:(c:any)=>{
                this.loggedUser.claims=c;
                if (c && c.informatikus) this.informatikus=c.informatikus;
                else this.informatikus=false;
                if (c && c.superAdmin) this.superAdmin=c.superAdmin;
                else this.superAdmin=false;
                console.log("Jogkörök: ",this.loggedUser.claims)
                
                // Kellett ez ide?
                console.log("consructor next 1")
                this.isLogged.next(this.loggedUser)
                this.isInformatikus.next(this.informatikus)
                this.isSuperAdmin.next(this.superAdmin)
              },
              error:(e)=>{
                this.loggedUser=null;
                this.informatikus=this.superAdmin=false;
                console.log("Hiba a jogkörök lekérdezésénél, ",e)}
            }
            )    
          }).catch((err:any) => {
            console.log("Hiba a token lekérésénél, ",err);
          });
  
        }
        else{
          this.loggedUser=null;
          this.informatikus=this.superAdmin=false;
          // console.log("Hírdetve, belépés hiba, Kilépett? !")
        }
        console.log("consructor next 2")
        this.isLogged.next(this.loggedUser)
        this.isInformatikus.next(this.informatikus)
        this.isSuperAdmin.next(this.superAdmin)
      })
  }


  getIsLoggedUserObservable(){
    return this.isLoggedUserObservable
  }

  getIsSuperAdmin(){
    return this.isSuperAdmin;
  }

  getIsInformatikus(){
    return this.isInformatikus
  }

  signIn(email:string, password:string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  getisLogged(){   
    return this.isLogged
  }

  sendInEmailLink(email:any){
    
  
    this.actionCodeSettings.url;
    //window.localStorage.setItem('emailForSignIn', email);
    return this.afAuth.sendSignInLinkToEmail(email, this.actionCodeSettings)
  }
  
  signInEmailLink(email:string){
      return this.afAuth.signInWithEmailLink(email)  
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
    console.log(url)
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

  getFilterUsers(claim?:string){
    claim="informatikus"
    console.log("-----------------------------------------")
    console.log("getFilterUsers futt")
    console.log("-----------------------------------------")
    this.filterUsers=[];
    const userle=this.getisLogged().subscribe((user)=>
    {
      console.log("*Csak******** getFilterUser Csak")
      if (user)
      {
        console.log("*************** getFilterUser", user)
        const v=this.getUsers().subscribe({
          next:(u)=>{
            console.log("getUsers(): ",u)
            this.users=u;
            this.filterUsers=this.users.filter((e:any)=>e.claims?.informatikus)

            // console.log("users",this.users);
            // console.log("userslenght",this.users.length);
            // for (let i = 0; i < this.users.length; i++) {    
            //   if (!this.users[i].displayName) 
            //     this.users[i].displayName=this.users[i].email;    
            //   this.getClaims(this.users[i].uid).subscribe(
            //     (c)=>{
            //       this.users[i].claims=c;
            //       if (claim && this.users[i].claims && this.users[i].claims[claim])
            //         this.filterUsers.push(this.users[i])
            //         this.filterUsersSubject.next(this.filterUsers)  
            //     }
            //   )          
            // } 
            
            // if (!claim) {this.filterUsers=this.users;
            console.log("NEXTTTTTTTTT")
            console.log(this.filterUsers)
            this.filterUsersSubject.next(this.filterUsers)
          // }
          },
          error:(e)=> console.log(e)
        }
        )
        // v.unsubscribe();
      }
    }

    
    )
    // userle.unsubscribe();
  }

  getFilterUserSubject(){
    console.log("Feliratkozás getfilterUsers")
    return this.filterUsersSubject
  }
}
