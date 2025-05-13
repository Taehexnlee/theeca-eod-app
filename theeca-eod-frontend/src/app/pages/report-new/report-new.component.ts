import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EodReportService } from '../../services/eod-report.service';

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
    cashSales: null,
    grossSales: null,
    netSales: null,
    tips: null,
    refund: null,
    refundComment: '',
    rating: 0,
    name: ''
  };

  denominations = [
    { label: '$100.00', value: 100, count: null },
    { label: '$50.00', value: 50, count: null },
    { label: '$20.00', value: 20, count: null },
    { label: '$10.00', value: 10, count: null },
    { label: '$5.00', value: 5, count: null },
    { label: '$2.00', value: 2, count: null },
    { label: '$1.00', value: 1, count: null },
    { label: '$0.50', value: 0.5, count: null },
    { label: '$0.20', value: 0.2, count: null },
    { label: '$0.10', value: 0.1, count: null },
    { label: '$0.05', value: 0.05, count: null }
  ];

  totalCash = 0;
  totalToBank = 0;
  variance = 0;

  todayDate = '';
  nowTime = '';

  constructor(
    private router: Router,
    private eodReportService: EodReportService
  ) {}

  ngOnInit(): void {
    const now = new Date();
    this.todayDate = now.toLocaleDateString('en-AU', { timeZone: 'Australia/Sydney' });
    this.nowTime = now.toLocaleTimeString('en-AU', { timeZone: 'Australia/Sydney', hour: '2-digit', minute: '2-digit' });
  }

  calculateTotals(): void {
    this.totalCash = this.denominations.reduce((sum, d) => {
      const count = d.count ?? 0;
      return sum + d.value * count;
    }, 0);
    this.totalToBank = this.totalCash - 450;
    this.calculateVariance();
  }
  calculateVariance(): void {
    const cashSales = this.form.cashSales ?? 0;
    this.variance = cashSales - this.totalToBank;
  }

  submit(): void {
    const now = new Date();

    const report = {
      name: this.form.name,
      cashSales: this.form.cashSales ?? 0,
      grossSales: this.form.grossSales ?? 0,
      netSales: this.form.netSales ?? 0,
      totalCash: this.totalCash,
      totalToBank: this.totalToBank,
      tips: this.form.tips ?? 0,
      refund: this.form.refund ?? 0,
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
        alert('✅ Report saved!');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Failed to save report', err);
        alert('Failed to save the report. Please try again.');
      }
    });
  }
}
