import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-gpa-chart-page',
  templateUrl: './gpa-chart-page.component.html',
  styleUrl: './gpa-chart-page.component.scss',
})
export class GPAChartPageComponent implements OnInit {
  constructor(private data: DataService) {}
  ngOnInit(): void {
    this.data.navigated();
  }
}
