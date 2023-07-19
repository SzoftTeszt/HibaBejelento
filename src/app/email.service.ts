import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendMail(email:string,template:string, content?:string, cc_mail?:string){
    var templateParams:any = {
      
  };
  
  templateParams.cc_address=email
  console.log(cc_mail)
  if (cc_mail)  templateParams.cc_address+=";"+cc_mail
  if (content)  templateParams.content=content
  console.log("templateParams", templateParams)
  
  emailjs.send('114477704928306662789', 
  template, 
  templateParams,
  'I2ux2EnOKBrHKLDji' ).then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
  }
}
