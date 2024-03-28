import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ApiInitService } from '../services/api-init.service';

@Injectable({
  providedIn: 'root'
})
export class noInternetGuard implements CanActivate {

  constructor(private api: ApiInitService, private auth:AuthService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    var response = await this.api.checkAPI()
    if(!response){
        this.auth.logout()
    }
    return response
}
}