import { Authguard } from './services/authguard.service';
import { AuthService } from './services/auth.service';
import { HttpModule } from '@angular/http';
import { WebService } from './services/web.service';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatCardModule , MatInputModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MessagesComponent } from './components/messages/messages.component';
import { NewMessageComponent } from './components/new-message/new-message.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';


@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    NewMessageComponent,
    NavBarComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent,
        canActivate: [Authguard]
      },
      {
        path: 'messages/:id',
        component: MessagesComponent,
        canActivate: [Authguard]
      },
      {
        path: 'messages',
        component: MessagesComponent,
        canActivate: [Authguard]
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'users/me',
        component: UserComponent,
        canActivate: [Authguard]
      }
    ])
  ],
  providers: [ WebService,
               AuthService,
               Authguard
              ],
  bootstrap: [AppComponent]
})
export class AppModule { }
