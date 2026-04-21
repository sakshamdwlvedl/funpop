import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './core/components/header/header.component';
import { SplashComponent } from './shared/components/splash/splash.component';
import { CommonService } from './core/services/common.service';
import { LoaderComponent } from './shared/components/loader/loader.component';
import { COMMON } from './core/constants/common.constant';
import { NotificationService } from './core/services/notification.service';
import { NetworkIndicatorComponent } from './shared/components/network-indicator/network-indicator.component';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    CommonModule,
    SplashComponent,
    LoaderComponent,
    NetworkIndicatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  deferredPrompt: any;
  showInstallButton = false;
  showSplash = true;
  isLoginPage = false;

  COMMON: typeof COMMON = COMMON;

  constructor(
    public commonService: CommonService,
    private notificationService: NotificationService,
    private router: Router
  ) {
    this.isLoginPage = window.location.pathname.includes('/login');

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.isLoginPage = event.urlAfterRedirects.includes('/login');
    });

    const splashPlayed = sessionStorage.getItem('splashPlayed');
    if (!this.commonService.isPwa() || splashPlayed === 'true') {
      this.showSplash = false;
    }

    // Subscribe to push notifications
    this.notificationService.requestPermissionAndSubscribe(environment.USER_ID);
    this.notificationService.listenToNotifications();
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: Event) {
    // Prevent the default browser prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;

    setTimeout(() => {
      this.showInstallButton = true;
    });
  }

  @HostListener('window:appinstalled')
  onAppInstalled() {
    setTimeout(() => {
      this.showInstallButton = false;
    });
  }

  onSplashFinished() {
    this.showSplash = false;
    sessionStorage.setItem('splashPlayed', 'true');
    if (this.deferredPrompt) {
      this.showInstallButton = true;
    }
  }

  installPwa() {
    if (this.deferredPrompt) {
      this.deferredPrompt.prompt();
      this.deferredPrompt.userChoice.then(() => {
        this.deferredPrompt = null;
        this.showInstallButton = false;
      });
    }
  }
}
