import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort',
  // pure: false
})
export class SortPipe implements PipeTransform {

  transform(array:any, mezo:any, irany:number): any {
    console.log("Sort pipe")
    if (!mezo || !array) return array;
   
    return array.sort((a:any, b:any)=>{
      
      if (irany==2)
      {
        const seged=a;
        a=b;
        b= seged; 
      }

      // if (mezo.key=='piority' || mezo.key=='status')
      // {
      //   if (a[mezo.key]>b[mezo.key]) return 1;
      //   if (a[mezo.key]<b[mezo.key]) return -1;
      //   return 0
      // }

      return a[mezo.key].localeCompare(b[mezo.key], 'hu', { sensitivity: 'base' })


    })
    
   
   
  }

}
