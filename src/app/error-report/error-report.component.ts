import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';
import { map } from 'rxjs';
import { EmailService } from '../email.service';
import { ErrorModel } from '../errorModel';


@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.component.html',
  styleUrls: ['./error-report.component.css']
})
export class ErrorReportComponent {
uuid:any;
uuids:any=[];
user:any=null;
finish=false;
error=false;
mail:any;

constructor(private aroute:ActivatedRoute, public base:BaseService
  ,public router:Router, private auth:AuthService, private email:EmailService){

  var mail= window.localStorage.getItem("email"); 
  if (mail) this.auth.signInEmailLink(mail).then((result)=>{
    this.mail=mail
    window.localStorage.removeItem("email");
    this.finish=true;
    this.error=false;
    // console.log("Sikeres belépés", result)
  })
  .catch((e)=>
  {
    console.log("Azonosítási hiba",e);
    this.finish=true;
    this.error=true;
  })
  else {
    this.finish=true;
    this.error=true;
  }

  // this.auth.getisLogged().subscribe((user)=>
  // {
  //   this.user=user;
  //   this.finish=true;
  //   console.log("Saját!!! user(Errorreport):", user)
  // }
  // )  
}



hibajegyleadasa(content:any){
  var body:ErrorModel={}
  body.content=content;
  body.email=this.mail;
  body.status=0;
  body.piority=0;
  body.uid="0";
  var d=new Date();
  console.log(d.toLocaleDateString(),";;;", d.toLocaleTimeString())
  body.date=d.toLocaleDateString()+" "+d.toLocaleTimeString();
  this.base.createError(body)

  this.email.sendMail(this.mail, '')
  // this.base.DeleteUUID(this.search()[0].key);
  this.auth.signOut();
  this.router.navigate(['/hibajegyfeldolgozasa'])
}

}
