import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
user:any;
collapse=true;
constructor( private auth:AuthService){ 
  this.auth.getisLogged().subscribe((user)=>
  {
    this.user=user
    // console.log("Saját!!! user(Errorreport):", user)
  }
  )  
}

signOut(){
  this.auth.signOut();
}

}
