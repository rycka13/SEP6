import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { LoginComponent } from "src/app/auth/login/login.component";
import { RegisterComponent } from "src/app/auth/register/register.component";

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
  },
  {
    path:'login',
    title: 'Login',
    component: LoginComponent,
  },
  {
    path:'register',
    title: 'Register',
    component: RegisterComponent,
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
