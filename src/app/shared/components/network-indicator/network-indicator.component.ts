import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-network-indicator',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './network-indicator.component.html',
  styleUrls: ['./network-indicator.component.scss'],
})
export class NetworkIndicatorComponent implements OnInit, OnDestroy {
  isSlow = false;
  isOffline = false;
  private checkInterval: any;

  ngOnInit() {
    this.checkNetwork();
    window.addEventListener('online', () => (this.isOffline = false));
    window.addEventListener('offline', () => (this.isOffline = true));

    // Check every 10 seconds
    this.checkInterval = setInterval(() => this.checkNetwork(), 5000);
  }

  ngOnDestroy() {
    if (this.checkInterval) clearInterval(this.checkInterval);
  }

  checkNetwork() {
    const conn = (navigator as any).connection;
    if (conn) {
      // 2g or slow-2g or high RTT
      this.isSlow =
        conn.effectiveType === '2g' ||
        conn.effectiveType === 'slow-2g' ||
        conn.rtt > 500;
    }
    this.isOffline = !navigator.onLine;
  }
}
