import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { UUIDModel } from './uuid';
import { ErrorModel } from './errorModel';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private refUUID: AngularFireList<UUIDModel>
  private refHibajegy: AngularFireList<ErrorModel>
  constructor(private db:AngularFireDatabase) {
    this.refUUID=db.list('hibaazonositok');
    this.refHibajegy=db.list('hibajegyek');
   }

   AddUUID(UUID:any){
    return this.refUUID.push(UUID)
   }
   GetAllUUID(){
    return this.refUUID;
   }
   DeleteUUID(key:any){
    return this.refUUID.remove(key);
   }
   createError(body:any){
      
      return this.refHibajegy.push(body)
   }
   getErrors(){
    return this.refHibajegy;
   }

}
