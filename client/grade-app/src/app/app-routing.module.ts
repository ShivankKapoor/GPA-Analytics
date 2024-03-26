import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/authGuard';
import { reLoginGuard } from './guards/reLoginGuard';
import { AddClassPageComponent } from './pages/add-class-page/add-class-page.component';
import { noInternetGuard } from './guards/noInternetGuard';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard, noInternetGuard]},
  { path: 'register', component: RegistrationPageComponent, canActivate: [reLoginGuard]},
  {path: 'login', component:LoginPageComponent, canActivate: [reLoginGuard]},
  { path: 'add-class', component: AddClassPageComponent, canActivate: [AuthGuard, noInternetGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
