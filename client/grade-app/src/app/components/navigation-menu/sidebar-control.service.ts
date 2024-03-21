import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidebarControlService {
  private sidebarToggleSubject = new Subject<void>();

  sidebarToggle$ = this.sidebarToggleSubject.asObservable();

  toggleSidebar() {
    this.sidebarToggleSubject.next();
  }
}