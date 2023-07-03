import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BaseService } from '../base.service';
import { map } from 'rxjs';


@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.component.html',
  styleUrls: ['./error-report.component.css']
})
export class ErrorReportComponent {
uuid:any;
uuids:any=[]
constructor(private aroute:ActivatedRoute, public base:BaseService
  ,private router:Router){

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

}

isValid(){ 
  return this.search().length>0;
}

search(){
  const array= this.uuids.filter((elem:any)=>{
    console.log("elem",elem.uuid)
    console.log("uuid",this.uuid)
    console.log(elem.uuid==this.uuid)
    return elem.uuid==this.uuid
  })
 return array;
}

hibajegyleadasa(){
  this.base.DeleteUUID(this.search()[0].key);
  this.router.navigate(['/hibajegyfeldolgozasa'])
}

}
