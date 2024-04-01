import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private apiUrl = 'http://localhost:3000';
  private userId: any;
  private firstName: any;
  private lastName: any;
  
  constructor(private http: HttpClient,
    private auth: AuthService) { }

  getUserInfo(): Observable<any> {
    var requestURL=this.apiUrl.concat("/user-info")
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(requestURL, { headers });
  }

  getAllSems(): Observable<any>{
    var requestURL=this.apiUrl.concat("/get-sems")
    return this.http.get<any[]>(requestURL)
  }

  getAllProfs(): Observable<any>{
    var requestURL=this.apiUrl.concat("/get-profs")
    return this.http.get<any[]>(requestURL)
  }

  private getData(): Observable<any>{
    var requestURL=this.apiUrl.concat("/get-enrollments")
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<any>(requestURL, { headers });
  }

  async getAllEnrolls(){
    var enrollmentData = [];
    try {
      const userInfo = await this.getUserInfo().toPromise();
      this.setUserID(userInfo.id);
      this.setfirstName(userInfo.firstName);
      this.setLastName(userInfo.lastName);

      if (userInfo.lastName == null) {
        this.auth.logout();
      }

      const enrollmentsResponse = await this
        .getData()
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
      enrollmentData = enrollmentsResponse.enrollments;
    } catch (error) {
      console.error('Error fetching data:', error);
      this.auth.logout();
    }
    return enrollmentData
  }

  setUserID(id:any){
    this.userId=id;
  }
  
  getUserID(){
    return this.userId;
  }

  setfirstName(firstName:any){
    this.firstName=firstName;
  }
  
  getFirstName(){
    return this.firstName;
  }

  setLastName(lastName:any){
    this.lastName=lastName;
  }
  
  getLastName(){
    return this.lastName;
  }

  async getSemesterClasses(semesterId: number): Promise<any[]> {
    try {
      const enrollmentsResponse = await this.getAllEnrolls();
      const responseArray: any[] = [];

      enrollmentsResponse.forEach((enrollment: any) => {
        if (enrollment.sem_id === semesterId) {
          responseArray.push(enrollment);
        }
      });

      console.log(responseArray);
      return responseArray;
    } catch (error) {
      console.error('Error retrieving semester GPA:', error);
      return [];
    }
  }
}
