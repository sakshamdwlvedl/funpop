import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SwPush } from '@angular/service-worker';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private readonly VAPID_PUBLIC_KEY = 'BF8zHB_4FdRgv_vZYWQeyzj0GxiJ7Na0iPvpcX0ARvYX6tys_E8Y178rs-hv351uL_e9RTFE0Hdh6mJbxhwF4jQ';
  private apiUrl = `${environment.BACKEND_URL}/notifications`;

  constructor(
    private swPush: SwPush,
    private http: HttpClient,
    private appRef: ApplicationRef
  ) {}

  async requestPermissionAndSubscribe(userId?: string) {
    if (!this.swPush.isEnabled) {
      console.warn('Push notifications are not enabled/supported in this browser.');
      return;
    }

    try {
      const sub = await this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
      });

      // Send subscription to backend
      await firstValueFrom(this.http.post(`${this.apiUrl}/subscribe`, {
        subscription: sub,
        userId: userId
      }));

      console.log('Push subscription successful');
    } catch (err) {
      console.error('Could not subscribe to notifications', err);
    }
  }

  listenToNotifications() {
    this.swPush.messages.subscribe(msg => {
      console.log('Push message received:', msg);
    });

    this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      console.log('Notification clicked:', notification);
      if (notification.data && notification.data.url) {
        window.open(notification.data.url, '_blank');
      }
    });
  }
}
