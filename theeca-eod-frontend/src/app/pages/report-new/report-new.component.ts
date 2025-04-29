import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EodReportService } from '../../services/eod-report.service'; // ✅ 추가

@Component({
  selector: 'app-report-new',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-new.component.html',
  styleUrls: ['./report-new.component.scss']
})
export class ReportNewComponent implements OnInit {
  form = {
    shift: 'Brunch',
    cashSales: 0,
    grossSales: 0,
    netSales: 0,
    tips: 0,
    refund: 0,
    refundComment: '',
    rating: 0,
    name: ''
  };

  denominations = [
    { label: '$100.00', value: 100, count: 0 },
    { label: '$50.00', value: 50, count: 0 },
    { label: '$20.00', value: 20, count: 0 },
    { label: '$10.00', value: 10, count: 0 },
    { label: '$5.00', value: 5, count: 0 },
    { label: '$2.00', value: 2, count: 0 },
    { label: '$1.00', value: 1, count: 0 },
    { label: '$0.50', value: 0.5, count: 0 },
    { label: '$0.20', value: 0.2, count: 0 },
    { label: '$0.10', value: 0.1, count: 0 },
    { label: '$0.05', value: 0.05, count: 0 }
  ];

  totalCash = 0;
  totalToBank = 0;
  variance = 0;

  todayDate = '';
  nowTime = '';

  constructor(
    private router: Router,
    private eodReportService: EodReportService // ✅ 추가
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.todayDate = now.toLocaleDateString('en-AU', { timeZone: 'Australia/Sydney' });
    this.nowTime = now.toLocaleTimeString('en-AU', { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit' });
  }

  calculateTotals(): void {
    this.totalCash = this.denominations.reduce((sum, d) => sum + d.value * d.count, 0);
    this.totalToBank = this.totalCash - 450;
    this.calculateVariance();
  }

  calculateVariance(): void {
    this.variance = this.form.cashSales - this.totalToBank;
  }

  submit(): void {
    const now = new Date();
  
    const report = {
      name: this.form.name,
      cashSales: this.form.cashSales,
      grossSales: this.form.grossSales,
      netSales: this.form.netSales,
      totalCash: this.totalCash,
      totalToBank: this.totalToBank,
      tips: this.form.tips,
      refund: this.form.refund,
      refundComment: this.form.refundComment,
      variance: this.variance,
      shift: this.form.shift,
      date: now.toLocaleDateString('en-AU', { timeZone: 'Australia/Sydney' }),
      time: now.toLocaleTimeString('en-AU', { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit' }),
      createdAt: now.toISOString()
    };
  
    this.eodReportService.createReport(report).subscribe({
      next: (savedReport) => {
        console.log('Report saved!', savedReport);
        this.router.navigate(['/saved']);
      },
      error: (err) => {
        console.error('Failed to save report', err);
        alert('Failed to save the report. Please try again.');
      }
    });
  }
}