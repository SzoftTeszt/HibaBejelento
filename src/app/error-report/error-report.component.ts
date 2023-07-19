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
bejentoHibaUid="";
uuid:any;
uuids:any=[];
user:any=null;
finish=false;
error=false;
mail:any;
mailUser=false;

constructor(private aroute:ActivatedRoute, public base:BaseService
  ,public router:Router, private auth:AuthService, private email:EmailService){

  var mail= window.localStorage.getItem("email"); 
  if (mail) this.auth.signInEmailLink(mail).then((result)=>{
    this.mail=mail
    window.localStorage.removeItem("email");
    this.finish=true;
    this.error=false;
    this.mailUser=true;
    // console.log("Sikeres belépés", result)
  })
  .catch((e)=>
  {
    console.log("Azonosítási hiba",e);
    this.finish=true;
    this.error=true;
  })
  else {
    this.auth.isLogged.subscribe((u)=>
    {
      if (u) {
        this.finish=true;
        this.error=false;
        this.mail=u.email;
      }
      else {
        this.finish=true;
        this.error=true;
      }
    })
    // this.finish=true;
    // this.error=true;
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
  body.status="Felvéve";
  body.piority="Normál";
  body.uid="inJm7jVYFeRX4Sn2TAY4uK9ml0v2";
  var d=new Date();
  console.log(d.toLocaleDateString(),";;;", d.toLocaleTimeString())
  body.date=d.toLocaleDateString()+" "+d.toLocaleTimeString();
  this.base.createError(body)

  console.log("MailUser",this.mailUser)
  if (this.mailUser){
    this.email.sendMail(this.mail, 'template_oeoe2ho')
    // this.base.DeleteUUID(this.search()[0].key);
    this.auth.signOut().then(()=> this.router.navigate(['/hibajegyfeldolgozasa']));
   
  }
}
}


