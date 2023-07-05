import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
bejelentve=false;
constructor (private auth:AuthService){}

hibabejelentes(email:any){
  if (email)
  {
    this.auth.sendInEmailLink(email).then();
    this.bejelentve=true;
    window.localStorage.setItem("email",email);
  }
}
}
