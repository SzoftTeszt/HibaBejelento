import { Injectable } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() { }

  sendMail(email:string,template:string){
    var templateParams = {
      cc_address:email
  };
  
  templateParams.cc_address+=";jagerattila@gmail.com"
  console.log("templateParams", templateParams)
  
  emailjs.send('114477704928306662789', 
  'template_oeoe2ho', 
  templateParams,
  'I2ux2EnOKBrHKLDji' ).then(function(response) {
         console.log('SUCCESS!', response.status, response.text);
      }, function(error) {
         console.log('FAILED...', error);
      });
  }
}
