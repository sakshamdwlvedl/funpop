import { Injectable } from '@angular/core';
import { fromEvent, map, startWith } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private _isMobile = window.innerWidth < 576;
  private _isTablet = window.innerWidth >= 576 && window.innerWidth < 1024;

  constructor() {
    fromEvent(window, 'resize')
      .pipe(
        map(() => window.innerWidth),
        startWith(window.innerWidth),
      )
      .subscribe((width) => {
        this.isMobile = width < 576;
        this.isTablet = width >= 576 && width < 1024;
      });
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
}
