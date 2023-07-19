import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
user:any;
collapse=true;
isInformatikus=false;
isSuperAdmin=false;
constructor( private auth:AuthService, private router:Router, private search:SearchService){ 
  this.auth.getisLogged().subscribe((user)=>
  {
    this.user=user
    // console.log("Saját!!! user(Errorreport):", user)
  }
  )  

  this.auth.getIsInformatikus().subscribe(
    (logikai)=>{this.isInformatikus=logikai; 
      console.log("Nav hírdetés informatikus", this.isInformatikus)}
  )

  this.auth. getIsSuperAdmin().subscribe(
    (logikai)=>{this.isSuperAdmin=logikai; 
      console.log("Nav hírdetés sadmin", this.isSuperAdmin)}
  )

}


signOut(){
  
  this.auth.signOut().then(()=>
      this.router.navigate(['/']));
}

kereses(szo:string){
  this.search.setSearch(szo)
}

}
