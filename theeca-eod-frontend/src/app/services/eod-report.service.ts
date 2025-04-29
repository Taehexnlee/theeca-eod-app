import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment'; // ✅ 추가

export interface EODReport {
  id?: number;
  name: string;
  cashSales: number;
  grossSales: number;
  netSales: number;          // ✅ 추가
  totalCash: number;         // ✅ 추가
  totalToBank: number;
  tips: number;              // ✅ 추가
  refund: number;            // ✅ 추가
  refundComment?: string;    // ✅ 추가
  variance: number;          // ✅ 추가
  shift: string;             // ✅ 추가
  date: string;              // ✅ 추가
  time: string;              // ✅ 추가
  createdAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class EodReportService {
  private apiUrl = `${environment.apiUrl}/EODReport`; // ✅ 수정

  constructor(private http: HttpClient) {}

  getReports(): Observable<EODReport[]> {
    return this.http.get<EODReport[]>(this.apiUrl);
  }

  createReport(report: EODReport): Observable<EODReport> {
    return this.http.post<EODReport>(this.apiUrl, report);
  }
  deleteReport(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}