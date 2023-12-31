import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  email="";
  password="";
  user:any=null;
  constructor(private auth:AuthService, private router:Router){
    this.auth.getisLogged().subscribe((user)=>
  {
    this.user=user;
    // console.log("BelépvesingIn", user);
    if (user)
      {
        console.log("Átirányít a hibajegykre!!!!", user)
         this.router.navigate(['/hibajegyek']);
        }
        
  })

  }

  signIn(email:string, password:string){
    this.auth.signIn(email, password)
    .then(()=>{
      console.log("Sikeres belépés");
     this.router.navigate(['/hibajegyek'])
    })
    .catch((err)=>console.log("Hiba a belépésnél!", err.message))
  }

  googleAuth(){
    this.auth.googleAuth()
    .then(()=>{console.log("Sikeres googlebelépés");
          this.router.navigate(['/hibajegyek']);   
  })
    .catch((err)=>console.log("Google belépés hiba",err.message))

  }
}
