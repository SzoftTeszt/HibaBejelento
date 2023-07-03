import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorReportComponent } from './error-report/error-report.component';
import { HibajegyfeldolgozasaComponent } from './hibajegyfeldolgozasa/hibajegyfeldolgozasa.component';

const routes: Routes = [
  {path:"errorreport", component:ErrorReportComponent},
  {path:"hibajegyfeldolgozasa", component:HibajegyfeldolgozasaComponent},
  {path:"", component:SignUpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
