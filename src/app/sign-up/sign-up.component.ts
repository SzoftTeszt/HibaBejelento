import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
bejelentve=false;
email="";
password="";

constructor (private auth:AuthService, private router:Router){}

hibabejelentes(email:any){
  if (email)
  {
    this.auth.sendInEmailLink(email).then();
    this.bejelentve=true;
    window.localStorage.setItem("email",email);
  }
}



signUp(email:string, password:string){
  this.auth.signUp(email, password)
  .then(()=>{
    console.log("Sikeres regiszráció");
    this.auth.sendVerificationEmail()
  })
  .catch((err)=>console.log("Regisztrációs hiba", err.message))
}

googleAuth(){
  this.auth.googleAuth()
  .then(()=>{console.log("Sikeres google regiszráció");
        this.router.navigate(['/sandwich']);   
})
  .catch((err)=>console.log("Google regisztrációs hiba",err.message))

}


}
