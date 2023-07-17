import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(array:any, szo:any): any {
    if (!szo) return array;
    return array.filter((elem:any)=>
       JSON.stringify(elem).toLowerCase().includes(szo.toLowerCase())
       )
  }

}
