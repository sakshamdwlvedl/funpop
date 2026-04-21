import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

export interface AuthUser {
  userId: string;
  email: string;
  username: string;
  avatar?: string;
}

const TOKEN_KEY = 'funpop_token';
const USER_KEY = 'funpop_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = environment.BACKEND_URL + '/api/auth';

  private _user$ = new BehaviorSubject<AuthUser | null>(this.loadUser());
  user$ = this._user$.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  get currentUser(): AuthUser | null {
    return this._user$.value;
  }

  get token(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  get isLoggedIn(): boolean {
    return !!this.token && !!this.currentUser;
  }

  register(email: string, password: string, username: string, avatar?: string) {
    return this.http
      .post<{ access_token: string; user: AuthUser }>(`${this.base}/register`, {
        email,
        password,
        username,
        avatar,
      })
      .pipe(tap((res) => this.storeSession(res)));
  }

  login(email: string, password: string) {
    return this.http
      .post<{ access_token: string; user: AuthUser }>(`${this.base}/login`, {
        email,
        password,
      })
      .pipe(tap((res) => this.storeSession(res)));
  }

  loginWithGoogle() {
    window.location.href = `${this.base}/google`;
  }

  /** Called from the /auth/callback route after Google redirect */
  handleGoogleCallback(token: string, user: AuthUser) {
    this.storeSession({ access_token: token, user });
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this._user$.next(null);
    this.router.navigate(['/login']);
  }

  private storeSession(res: { access_token: string; user: AuthUser }) {
    localStorage.setItem(TOKEN_KEY, res.access_token);
    localStorage.setItem(USER_KEY, JSON.stringify(res.user));
    this._user$.next(res.user);
  }

  private loadUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
}
