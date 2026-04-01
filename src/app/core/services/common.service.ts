import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { debounceTime, fromEvent, map, startWith, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _isMobile = window.innerWidth < 576;
  private _isTablet = window.innerWidth >= 576 && window.innerWidth < 1024;
  private _showLoader: boolean = false;

  private onSearchFilterClear = new Subject<void>();
  onSearchFilterClear$ = this.onSearchFilterClear.asObservable();

  constructor(private readonly location: Location) {
    fromEvent(window, 'resize')
      .pipe(
        debounceTime(150),
        map(() => window.innerWidth),
        startWith(window.innerWidth),
      )
      .subscribe((width) => {
        this.isMobile = width < 576;
        this.isTablet = width >= 576 && width < 1024;
      });
  }

  isAndroidOrIOS(): boolean {
    const ua = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android|iphone|ipad|ipod/i.test(ua);
  }

  isPwa(): boolean {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone ||
      document.referrer.includes('android-app://');
    return this.isAndroidOrIOS() && isStandalone;
  }

  set isMobile(val: boolean) {
    this._isMobile = val;
  }

  get isMobile(): boolean {
    return this._isMobile;
  }

  set isTablet(val: boolean) {
    this._isTablet = val;
  }

  get isTablet(): boolean {
    return this._isTablet;
  }

  showLoader() {
    this._showLoader = true;
  }

  hideLoader() {
    this._showLoader = false;
  }

  get isLoading(): boolean {
    return this._showLoader;
  }

  navigateBack() {
    this.location.back();
  }

  clearSearchFilter() {
    this.onSearchFilterClear.next();
  }
}
