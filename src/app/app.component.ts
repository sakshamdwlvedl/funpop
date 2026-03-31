import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { SplashComponent } from './shared/components/splash/splash.component';
import { CommonService } from './core/services/common.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule, SplashComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  deferredPrompt: any;
  showInstallButton = false;
  showSplash = true;

  constructor(public commonService: CommonService) {
    const splashPlayed = sessionStorage.getItem('splashPlayed');
    if (!this.commonService.isPwa() || splashPlayed === 'true') {
      this.showSplash = false;
    }
  }

  @HostListener('window:beforeinstallprompt', ['$event'])
  onbeforeinstallprompt(e: Event) {
    // Prevent the default browser prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    this.deferredPrompt = e;
    // Show the install button
    this.showInstallButton = true;
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

  @HostListener('window:appinstalled')
  onAppInstalled() {
    this.showInstallButton = false;
  }
}
