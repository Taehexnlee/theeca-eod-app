import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-access',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './report-access.component.html',
  styleUrls: ['./report-access.component.scss']
})
export class AccessComponent {
  passcode = '';

  constructor(private router: Router) {}

  checkPasscode(): void {
    if (this.passcode === '9887') {
      localStorage.setItem('access-granted', 'true');
      this.router.navigate(['/saved']);
    } else {
      alert('Wrong passcode. Try again.');
      this.passcode = '';
    }
  }
}