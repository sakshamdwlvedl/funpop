import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; min-height:100dvh; background:#f8fafc; color:#1e293b; font-size:1.1rem; gap:16px">
      <i class="pi pi-spin pi-spinner" style="font-size:2rem; color:#6366f1"></i>
      <span style="font-weight:600">Completing sign in...</span>
    </div>
  `,
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParamMap.get('token');
    const userRaw = this.route.snapshot.queryParamMap.get('user');

    if (token && userRaw) {
      try {
        const user = JSON.parse(decodeURIComponent(userRaw));
        this.auth.handleGoogleCallback(token, user);
        this.router.navigate(['/dashboard']);
      } catch {
        this.router.navigate(['/login']);
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
