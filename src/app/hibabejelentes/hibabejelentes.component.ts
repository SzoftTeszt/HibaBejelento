import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorModel } from '../errorModel';
import { BaseService } from '../base.service';

@Component({
  selector: 'app-hibabejelentes',
  templateUrl: './hibabejelentes.component.html',
  styleUrls: ['./hibabejelentes.component.css']
})
export class HibabejelentesComponent {
  bejelentve=false;
  constructor (private auth:AuthService, private base:BaseService){}
  
  hibabejelentes(email:any){
    if (email)
    { 
      this.auth.sendInEmailLink(email).then();
      this.bejelentve=true;
      window.localStorage.setItem("email",email);
    }
  }
}
