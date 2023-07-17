import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';
import { SearchService } from '../search.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-hibajegyek',
  templateUrl: './hibajegyek.component.html',
  styleUrls: ['./hibajegyek.component.css']
})
export class HibajegyekComponent {

  szo:string="";
  isInformatikus=false;
isSuperAdmin=false;
 
  hibajegyek:any;
  oszlopok=[
    {key:"date", text:"Dátum", type:"plaintext", rendez:1},
    {key:"email", text:"Email", type:"plaintext", rendez:0},
    {key:"content", text:"Leírás", type:"plaintext", rendez:0},
    {key:"piority", text:"Pioritás", type:"select", rendez:0, 
    values:[
      {value:"Alacsony", text:"Alacsony"},
      {value:"Normál", text:"Normál"},
      {value:"Súlyos", text:"Súlyos"},
    ]},
    {key:"uid", text:"Felelős", type:"select", rendez:0,
    values:[
      {value:"", text:"---"},
      {value:"jagerattila@gmail.com", text:"jagerattila@gmail.com"},
      {value:"szoftteszt2020@gmail.com", text:"szoftteszt2020@gmail.com"},
    ]},
    {key:"status", text:"Állapot", type:"select", rendez:0,
    values:[
      {value:"Felvéve", text:"Felvéve"},
      {value:"Folyamatban", text:"Folyamatban"},
      {value:"Megoldva", text:"Megoldva"},
    ]},

  ]
  rendezes=this.oszlopok[0]
 constructor(private base:BaseService, private search:SearchService, private auth:AuthService){
  this.base.getErrors().snapshotChanges().pipe(
    map(
      ch=> ch.map(c=>({key:c.payload.key, ... c.payload.val()}))
    )
  ).subscribe({
    next:(adat)=> this.hibajegyek=adat,
    error:(e)=>{}
 
  })

  this.search.getSearch().subscribe(
    (szo)=> this.szo=szo
  )

  this.auth.getIsInformatikus().subscribe(
    (logikai)=>this.isInformatikus=logikai       
  )

  this.auth. getIsSuperAdmin().subscribe(
    (logikai)=>this.isSuperAdmin=logikai      
  )
 }
 sort(oszlop:any){
  this.rendezes= this.oszlopok.filter((e:any)=>e.key==oszlop.key)[0]
  this.rendezes.rendez++;
  if (this.rendezes.rendez==3) this.rendezes.rendez=1;
  this.oszlopok.filter((e:any)=>e.key!=oszlop.key).forEach(e=>e.rendez=0)
  console.log(this.rendezes)
 }
 save(hibajegy:any){
  this.base.saveError(hibajegy)
 }
}
