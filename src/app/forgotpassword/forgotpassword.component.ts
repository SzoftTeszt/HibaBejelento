import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent {
  usermail=""
  constructor(private auth:AuthService, private router:Router){
    //this.usermail=this.auth.userData.email;
   }

  forgotPassword(usermail:string){
    this.auth.forgotPassword(usermail).then(()=>alert("Password reset emali sent, check your inbox."))
  }
}
