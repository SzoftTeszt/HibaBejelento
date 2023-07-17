import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-hibajegyek',
  templateUrl: './hibajegyek.component.html',
  styleUrls: ['./hibajegyek.component.css']
})
export class HibajegyekComponent {

  hibajegyek:any;
  oszlopok=[
    {key:"date", text:"Dátum", type:"plaintext"},
    {key:"email", text:"Email", type:"plaintext"},
    {key:"content", text:"Leírás", type:"plaintext"},
    {key:"piority", text:"Pioritás", type:"select", 
    values:[
      {value:0, text:"Alacsony"},
      {value:1, text:"Normál"},
      {value:2, text:"Magas"},
    ]},
    {key:"uid", text:"Felelős", type:"select", 
    values:[
      {value:0, text:"---"},
      {value:1, text:"jagerattila@gmail.com"},
      {value:2, text:"szoftteszt2020@gmail.com"},
    ]},
    {key:"status", text:"Állapot", type:"select", 
    values:[
      {value:0, text:"Felvéve"},
      {value:1, text:"Folyamatban"},
      {value:2, text:"Megoldva"},
    ]},

  ]

 constructor(private base:BaseService){
  this.base.getErrors().snapshotChanges().pipe(
    map(
      ch=> ch.map(c=>({key:c.payload.key, ... c.payload.val()}))
    )
  ).subscribe({
    next:(adat)=> this.hibajegyek=adat,
    error:(e)=>{}
 
  })
 }

}
