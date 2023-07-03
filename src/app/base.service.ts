import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { UUIDModel } from './uuid';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  private refUUID: AngularFireList<UUIDModel>
  constructor(private db:AngularFireDatabase) {
    this.refUUID=db.list('hibaazonositok')
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
}
