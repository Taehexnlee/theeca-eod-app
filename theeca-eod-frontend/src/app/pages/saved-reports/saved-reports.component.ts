import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EodReportService, EODReport } from '../../services/eod-report.service'; // ✅ 추가

@Component({
  selector: 'app-saved-reports',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './saved-reports.component.html',
  styleUrls: ['./saved-reports.component.scss']
})
export class SavedReportsComponent implements OnInit {
  reports: EODReport[] = [];

  constructor(
    private eodReportService: EodReportService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const accessGranted = localStorage.getItem('access-granted');
    if (accessGranted !== 'true') {
      this.router.navigate(['/access']);
      return;
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

  // ✅ 삭제 기능 추가
  deleteReport(id: number): void {
    if (!confirm('Are you sure you want to delete this report?')) {
      return;
    }

    this.eodReportService.deleteReport(id).subscribe({
      next: () => {
        console.log('Deleted successfully');
        // 삭제 후 목록 다시 불러오기
        this.loadReports();
      },
      error: (err) => {
        console.error('Failed to delete report', err);
      }
    });
  }
}