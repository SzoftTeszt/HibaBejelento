import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-error-report',
  templateUrl: './error-report.component.html',
  styleUrls: ['./error-report.component.css']
})
export class ErrorReportComponent {
uuid:any;
constructor(private aroute:ActivatedRoute){

  this.aroute.queryParams.subscribe(
    (params)=>this.uuid=params['uuid']
  )
}

}
