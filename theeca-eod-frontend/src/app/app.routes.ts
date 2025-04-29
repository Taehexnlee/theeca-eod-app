// src/app/app.routes.ts

import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReportNewComponent } from './pages/report-new/report-new.component';
import { ReportDetailComponent } from './pages/report-detail/report-detail.component';
import { AccessComponent } from './pages/report-access/report-access.component';
import { SavedReportsComponent } from './pages/saved-reports/saved-reports.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'new', component: ReportNewComponent },
  { path: 'report/:id', component: ReportDetailComponent },
  { path: 'access', component: AccessComponent },
  { path: 'saved', component: SavedReportsComponent },
  { path: '**', redirectTo: '' }
];