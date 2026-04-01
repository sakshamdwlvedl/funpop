import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, finalize, throwError } from 'rxjs';
import { CommonService } from './common.service';

interface HttpOptions {
  showLoader?: boolean;
  params?: any;
  headers?: any;
  body?: any;
  url: string;
  isFormData?: boolean;
  isBlobResponse?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(
    private http: HttpClient,
    private readonly commonService: CommonService,
  ) {}

  private createHeaders(headers?: any): HttpHeaders {
    let httpHeaders = new HttpHeaders();

    if (headers) {
      Object.keys(headers).forEach((key) => {
        httpHeaders = httpHeaders.set(key, headers[key]);
      });
    }

    return httpHeaders;
  }

  private createParams(params?: any): HttpParams {
    let httpParams = new HttpParams();

    if (params) {
      Object.keys(params).forEach((key) => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key]);
        }
      });
    }

    return httpParams;
  }

  get(options: HttpOptions): Observable<any> {
    if (options.showLoader !== false) {
      this.commonService.showLoader();
    }

    return this.http
      .get(options.url, {
        headers: this.createHeaders(options?.headers),
        params: this.createParams(options?.params),
      })
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.commonService.hideLoader();
        }),
      );
  }

  post(options: HttpOptions): Observable<any> {
    if (options.showLoader !== false) {
      this.commonService.showLoader();
    }

    return this.http
      .post(options.url, options?.body, {
        headers: this.createHeaders(options?.headers),
      })
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.commonService.hideLoader();
        }),
      );
  }

  put(options: HttpOptions): Observable<any> {
    if (options.showLoader !== false) {
      this.commonService.showLoader();
    }

    return this.http
      .put(options.url, options?.body, {
        headers: this.createHeaders(options?.headers),
      })
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.commonService.hideLoader();
        }),
      );
  }

  delete(options: HttpOptions): Observable<any> {
    if (options.showLoader !== false) {
      this.commonService.showLoader();
    }

    return this.http
      .delete(options.url, {
        headers: this.createHeaders(options?.headers),
        params: this.createParams(options?.params),
      })
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          this.commonService.hideLoader();
        }),
      );
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
