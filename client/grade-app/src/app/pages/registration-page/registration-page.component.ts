import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MiniWarningService } from '../../services/mini-warning.service';

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
    private router: Router,
    private warning:MiniWarningService
  ) {}

  async register() {

    if (this.password !== this.retypedPassword) {
      console.error('Passwords do not match');
      return;
    }

    const newUser = {
      username: this.username,
      password: this.password,
      first_name: this.firstName,
      last_name: this.lastName 
    };

    try {
      const response = await this.http.post<any>('http://localhost:3000/register', newUser).toPromise();
      console.log('Registration successful:', response);
      this.router.navigate(['/']);
      this.warning.openSnackBar("User Created!","Dismiss")
    } catch (error) {
      console.error('Registration failed:', error);
    }
  }

  showPassword() {
    this.showPasswordValue = !this.showPasswordValue;
  }
}
