import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReportCardComponent } from '../../components/report-card/report-card.component';
import { EODReport, EodReportService } from '../../services/eod-report.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ReportCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  reports: EODReport[] = [];

  constructor(private reportService: EodReportService) {}

  ngOnInit(): void {
    this.reportService.getReports().subscribe(data => {
      this.reports = data;
    });
  }
}