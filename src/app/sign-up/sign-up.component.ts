import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
constructor (private auth:AuthService){}

hibabejelentes(){
  this.auth.singInEmailLink().then((link)=>console.log("link",link));
}
}
