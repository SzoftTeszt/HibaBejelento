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
user:any;

constructor(private aroute:ActivatedRoute, public base:BaseService
  ,public router:Router, private auth:AuthService, private email:EmailService){

  this.aroute.queryParams.subscribe(
    (params)=>this.uuid=params['uuid']  
  )

  this.base.GetAllUUID().snapshotChanges().pipe(
    map(changes => changes.map(
      c=> ({key:c.payload.key, uuid:c.payload.val()})
    ))
  ).subscribe(
    (uuids)=> this.uuids=uuids
           
  )

  this.auth.signInEmailLink();

  this.auth.getisLogged().subscribe((user)=>
  {
    this.user=user
    console.log("Saját!!! user(Errorreport):", user)
  }
  )  
}

isValid(){ 
  return (this.search().length>0 && this.user);
}

search(){
  const array= this.uuids.filter((elem:any)=>{
    // console.log("elem",elem.uuid)
    // console.log("uuid",this.uuid)
    // console.log(elem.uuid==this.uuid)
    return elem.uuid==this.uuid
  })
 return array;
}

hibajegyleadasa(content:any){
  var body:ErrorModel={}
  body.content=content;
  body.email=this.user.email;
  body.status=0;
  body.piority=0;
  body.uid="0";
  var d=new Date();
  console.log(d.toLocaleDateString(),";;;", d.toLocaleTimeString())
  body.date=d.toLocaleDateString()+" "+d.toLocaleTimeString();
  this.base.createError(body)

  this.email.sendMail(this.user.email, '')
  this.base.DeleteUUID(this.search()[0].key);
  this.auth.signOut();
  this.router.navigate(['/hibajegyfeldolgozasa'])
}

}
