import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verifyemail',
  templateUrl: './verifyemail.component.html',
  styleUrls: ['./verifyemail.component.css']
})
export class VerifyemailComponent {

constructor(private auth:AuthService){}

sendMail(){
  this.auth.sendVerificationEmail();
}

}
