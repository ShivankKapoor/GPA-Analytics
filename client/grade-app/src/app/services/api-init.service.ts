import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiInitService {
  constructor(private http: HttpClient) {}

  async checkAPI() {
    try {
      const response = await this.http
        .get<any>('http://localhost:3000/')
        .toPromise();
      if(response.status=="UP"){
        return true
      }else{
        return false;
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }
}
