import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { AnalyticsService } from '../../services/analytics.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
  firstName: string = '';
  lastName: string = '';
  enrollmentData:any;
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
    private auth: AuthService,
    private data: DataService,
    private stats:AnalyticsService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.data.navigated()
    await this.getData();
    console.log(this.enrollmentData);
    this.hasEnrollments = this.enrollmentData.length != 0;
    this.data.getSemesterClasses(2)
  }

  async getData() {
    this.enrollmentData=await this.data.getAllEnrolls()
  }

  logout() {
    this.auth.logout();
  }
}
