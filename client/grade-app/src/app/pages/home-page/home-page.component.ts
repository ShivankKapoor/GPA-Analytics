import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  firstName: string="";
  lastName: string="";
  constructor(private userService:DataService){}

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(
      (response) => {
        this.firstName = response.firstName;
        this.lastName =response.lastName;
        console.log(this.firstName)
        console.log(this.lastName)
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }
}
