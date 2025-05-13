import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EodReportService, EODReport } from '../../services/eod-report.service';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-saved-reports',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './saved-reports.component.html',
  styleUrls: ['./saved-reports.component.scss']
})
export class SavedReportsComponent implements OnInit {
  reports: EODReport[] = [];
  startDate: string = '';
  endDate: string = '';

  constructor(
    private eodReportService: EodReportService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const accessGranted = localStorage.getItem('access-granted');
      if (accessGranted !== 'true') {
        this.router.navigate(['/access']);
        return;
      }
    }

    this.loadReports();
  }

  loadReports(): void {
    this.eodReportService.getReports().subscribe({
      next: (data) => {
        this.reports = data;
      },
      error: (err) => {
        console.error('Failed to fetch reports', err);
        this.reports = [];
      }
    });
  }

  deleteReport(id: number): void {
    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    this.eodReportService.deleteReport(id).subscribe({
      next: () => {
        console.log('Deleted successfully');
        this.loadReports();
      },
      error: (err) => {
        console.error('Failed to delete report', err);
      }
    });
  }

  getAbs(value: number): number {
    return Math.abs(value);
  }

  getFilteredReports(): EODReport[] {
    if (!this.startDate || !this.endDate) return this.reports;
  
    const start = new Date(this.startDate);
    start.setHours(0, 0, 0, 0); 
    const end = new Date(this.endDate);
    end.setHours(23, 59, 59, 999); // 종료일 끝까지 포함
  
    return this.reports.filter(report => {
      const createdAt = report.createdAt ? new Date(report.createdAt) : null;
      return createdAt && createdAt >= start && createdAt <= end;
    });
  }
  getTotalToBank(): number {
    return this.getFilteredReports()
      .map(report => report.totalToBank || 0)
      .reduce((acc, val) => acc + val, 0);
  }
}