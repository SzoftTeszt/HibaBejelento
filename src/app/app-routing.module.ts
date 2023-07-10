import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ErrorReportComponent } from './error-report/error-report.component';
import { HibajegyfeldolgozasaComponent } from './hibajegyfeldolgozasa/hibajegyfeldolgozasa.component';
import { HibabejelentesComponent } from './hibabejelentes/hibabejelentes.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { UserListComponent } from './user-list/user-list.component';
import { HibajegyekComponent } from './hibajegyek/hibajegyek.component';

const routes: Routes = [
  {path:"errorreport", component:ErrorReportComponent},
  {path:"hibajegyfeldolgozasa", component:HibajegyfeldolgozasaComponent},
  {path:"signin", component:SignInComponent},
  {path:"signup", component:SignUpComponent},  
  {path:"userlist", component:UserListComponent},  
  {path:"hibajegyek", component:HibajegyekComponent},  
  {path:"", component:HibabejelentesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
