import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { UserListComponent } from './user-list/user-list.component';
import { ErrorReportComponent } from './error-report/error-report.component';

import { Enviroments } from './enviroments';
import { HibajegyfeldolgozasaComponent } from './hibajegyfeldolgozasa/hibajegyfeldolgozasa.component';
import { NavComponent } from './nav/nav.component';
import { HibabejelentesComponent } from './hibabejelentes/hibabejelentes.component';
import { FormsModule } from '@angular/forms';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HibajegyekComponent } from './hibajegyek/hibajegyek.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    SignUpComponent,
    UserListComponent,
    ErrorReportComponent,
    HibajegyfeldolgozasaComponent,
    NavComponent,
    HibabejelentesComponent,
    VerifyemailComponent,
    ForgotpasswordComponent,
    HibajegyekComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(Enviroments.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
