import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {
  users:any;
  user:any;
  szo:string="";
  constructor(private auth:AuthService,  private search:SearchService){
    
    this.auth.getisLogged().subscribe((user)=>
    {
      this.user=user
      if (user)
      {
        this.auth.getUsers().subscribe({
          next:(u)=>{
            this.users=u;
            // console.log("users",this.users);
            // console.log("userslenght",this.users.length);
            for (let i = 0; i < this.users.length; i++) {    
              if (!this.users[i].displayName) 
                this.users[i].displayName=this.users[i].email;    
              this.auth.getClaims(this.users[i].uid).subscribe(
                (c)=>{
                  this.users[i].claims=c;
                }
              )          
            }      
          },
          error:(e)=> console.log(e)
        }
        )

      }
    }
    )
    this.search.getSearch().subscribe(
      (szo)=> this.szo=szo
    )



   
  }

  
  setClaims(claim:string, uid:any){
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].uid==uid)
      {
          if (!this.users[i].claims){
            this.users[i].claims={};
            this.users[i].claims[claim]=true;
          }
          else{
            this.users[i].claims[claim] = 
            !this.users[i].claims[claim];
          }
          console.log(this.users[i].claims);
      }      
    }
  }

  saveClaims(user:any){
    this.auth.setCustomClaims(user.uid, user.claims);
  }


}


