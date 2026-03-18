import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

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

  get(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .get(url, {
        headers: this.createHeaders(headers),
        params: this.createParams(params),
      })
      .pipe(catchError(this.handleError));
  }

  post(url: string, body: any, headers?: any): Observable<any> {
    return this.http
      .post(url, body, {
        headers: this.createHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  put(url: string, body: any, headers?: any): Observable<any> {
    return this.http
      .put(url, body, {
        headers: this.createHeaders(headers),
      })
      .pipe(catchError(this.handleError));
  }

  delete(url: string, params?: any, headers?: any): Observable<any> {
    return this.http
      .delete(url, {
        headers: this.createHeaders(headers),
        params: this.createParams(params),
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
