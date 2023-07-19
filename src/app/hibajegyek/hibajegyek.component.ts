import { Component } from '@angular/core';
import { BaseService } from '../base.service';
import { map } from 'rxjs';
import { SearchService } from '../search.service';
import { AuthService } from '../auth.service';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-hibajegyek',
  templateUrl: './hibajegyek.component.html',
  styleUrls: ['./hibajegyek.component.css']
})
export class HibajegyekComponent {

  szo:string="";
  isInformatikus=false;
isSuperAdmin=false;
informatikusok:any;
feliratkozas:any=null;
sendMailFelelos=false;

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
    {key:"uid", text:"Felelős", type:"felelos", rendez:0,
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
 constructor(private base:BaseService, 
  private search:SearchService, 
  private auth:AuthService,
  private mail:EmailService){
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

  console.log("Hibajegyek Contsructor")
  this.auth.getFilterUsers('informatikus')
  if (this.feliratkozas) this.feliratkozas.unsubscribe();
  this.feliratkozas=this.auth.getFilterUserSubject().subscribe(
    (u:any)=>{
      this.informatikusok=u
      console.log("Infósok:", this.informatikusok)
    }
  
  )


 }

 changeFelelos(event:any, hibajegy:any){
  this.sendMailFelelos=true;
  hibajegy.status="Folyamatban"

 }

 ngOnDestroy(){
  this.feliratkozas.unsubscribe()
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
  if (this.sendMailFelelos)
  {
    const content='Új hibajegy került a nevedre! <div style="font-size:24px">alma</div>'
    this.mail.sendMail(this.findUser(hibajegy.uid).email, 'template_o2vvgbv', content)
    this.sendMailFelelos=false;
  }
  if (hibajegy.status=="Megoldva")
  {
    const content='Az áltad bejelentett hiba kijavításra került!<br>Köszönjük a hiba jelzését!'
    this.mail.sendMail(hibajegy.email, 'template_o2vvgbv', content)


  }
 }


 findUser(uid:string){
  var inf= this.informatikusok.filter((ertek:any)=>ertek.uid==uid)
  if (inf && inf[0]) return  inf[0];
  return ""
 }
}
