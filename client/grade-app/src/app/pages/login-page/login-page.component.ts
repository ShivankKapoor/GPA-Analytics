import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  username: string = '';
  password: string = '';
  showPasswordValue: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async login() {
    const credentials = { username: this.username, password: this.password };

    try {
      const response = await this.http.post<any>('http://localhost:3000/login', credentials).toPromise();
      const token = response.token;
      // You may store the token in local storage or session storage for subsequent requests.
      localStorage.setItem('token', token);
      console.log(token)
      // Navigate to the desired route after successful login.
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure, e.g., show an error message to the user.
    }
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }
}
