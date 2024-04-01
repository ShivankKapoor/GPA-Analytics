import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  firstName: string = '';
  lastName: string = '';
  enrollmentData = [];
  hasEnrollments = false;
  displayedColumns: string[] = [
    'subject',
    'number',
    'class_desc',
    'grade',
    'semesterDisplayString',
    'hours',
    'professor_last_name',
  ];
  constructor(
    private userService: DataService,
    private auth: AuthService,
    private data: DataService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
    console.log(this.enrollmentData);
    this.hasEnrollments = this.enrollmentData.length != 0;
  }

  async getData() {
    try {
      const userInfo = await this.userService.getUserInfo().toPromise();
      this.data.setUserID(userInfo.id);
      this.data.setfirstName(userInfo.firstName);
      this.data.setLastName(userInfo.lastName);

      if (userInfo.lastName == null) {
        this.auth.logout();
      }

      const enrollmentsResponse = await this.data
        .getAllEnrollments()
        .toPromise();

      enrollmentsResponse.enrollments.forEach(
        (enrollment: {
          semesterDisplayString: any;
          sem_season: any;
          sem_year: any;
        }) => {
          enrollment.semesterDisplayString =
            enrollment.sem_season + ' ' + enrollment.sem_year;
        }
      );
      this.enrollmentData = enrollmentsResponse.enrollments;
    } catch (error) {
      console.error('Error fetching data:', error);
      this.auth.logout();
    }
  }

  logout() {
    this.auth.logout();
  }
}
