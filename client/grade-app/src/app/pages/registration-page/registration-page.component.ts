import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss'],
})
export class RegistrationPageComponent {
  username: string = '';
  firstName: string = '';
  lastName: string = '';
  password: string = '';
  retypedPassword: string = '';
  showPasswordValue: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async register() {
    // Check if passwords match
    if (this.password !== this.retypedPassword) {
      // Handle password mismatch error
      console.error('Passwords do not match');
      // You can display an error message to the user
      return;
    }

    const newUser = {
      username: this.username,
      password: this.password,
      first_name: '', // Add first name field if needed
      last_name: ''   // Add last name field if needed
    };

    try {
      const response = await this.http.post<any>('http://localhost:3000/register', newUser).toPromise();
      console.log('Registration successful:', response);
      // Redirect to login page after successful registration
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration failure, e.g., show an error message to the user
    }
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }
}
