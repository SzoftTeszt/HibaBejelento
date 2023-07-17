import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  szo:string="";
  getSzo= new BehaviorSubject<string>(this.szo)
  constructor() { }
  
  setSearch(szo:string){
    this.szo=szo;
    this.getSzo.next(this.szo)
  }
  getSearch(){
    return this.getSzo
  }
}
