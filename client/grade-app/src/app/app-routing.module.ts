import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegistrationPageComponent } from './pages/registration-page/registration-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { AuthGuard } from './guards/authGuard';
import { reLoginGuard } from './guards/reLoginGuard';
import { AddClassPageComponent } from './pages/add-class-page/add-class-page.component';
import { noInternetGuard } from './guards/noInternetGuard';
import { AddProfPageComponent } from './pages/add-prof-page/add-prof-page.component';
import { AddSemPageComponent } from './pages/add-sem-page/add-sem-page.component';
import { GPAChartPageComponent } from './pages/gpa-chart-page/gpa-chart-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent, canActivate: [AuthGuard, noInternetGuard]},
  { path: 'register', component: RegistrationPageComponent, canActivate: [reLoginGuard]},
  {path: 'login', component:LoginPageComponent, canActivate: [reLoginGuard]},
  { path: 'add-class', component: AddClassPageComponent, canActivate: [AuthGuard, noInternetGuard]},
  {path: 'add-prof', component:AddProfPageComponent, canActivate:[AuthGuard,noInternetGuard]},
  {path: 'add-sem', component:AddSemPageComponent, canActivate:[AuthGuard,noInternetGuard]},
  {path:'GPA-chart',component:GPAChartPageComponent, canActivate:[AuthGuard,noInternetGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
