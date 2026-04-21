import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FALLBACK_AVATARS } from '../../../core/constants/avatars.constant';
import { ApiCallService } from '../../../core/services/api-call.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isRegister = false;
  loading = false;
  error = '';
  showPwd = false;
  avatars: { name: string; url: string }[] = [];
  selectedAvatar: string | null = null;
  fetchingAvatars = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiCallService,
  ) {
    this.form = this.buildForm();
  }

  ngOnInit() {
    this.loadRealLifeAvatars();
  }

  private loadRealLifeAvatars() {
    // this.fetchingAvatars = true;

    // Fetch 3 pages to get ~60 people, then take 50
    // this.apiService.popularPeople(1).subscribe({
    //   next: (res: any) => {
    //     const people = res.results || [];
    //     this.avatars = people
    //       .filter((p: any) => p.profile_path)
    //       .map((p: any) => ({
    //         name: p.name,
    //         url: `${environment.TMDB_IMG_BASE}/w185${p.profile_path}`,
    //       }));

    //     if (this.avatars.length < 50) {
    //       this.apiService.popularPeople(2).subscribe((res2: any) => {
    //         const morePeople = res2.results || [];
    //         const additionalAvatars = morePeople
    //           .filter((p: any) => p.profile_path)
    //           .map((p: any) => ({
    //             name: p.name,
    //             url: `${environment.TMDB_IMG_BASE}/w185${p.profile_path}`,
    //           }));
    //         this.avatars = [...this.avatars, ...additionalAvatars].slice(0, 50);
    //         this.fetchingAvatars = false;
    //       });
    //     } else {
    //       this.avatars = this.avatars.slice(0, 50);
    //       this.fetchingAvatars = false;
    //     }
    //   },
    //   error: () => {
    //     this.avatars = FALLBACK_AVATARS;
    //     this.fetchingAvatars = false;
    //   },
    // });

    this.avatars = FALLBACK_AVATARS;
  }

  get f() {
    return this.form.controls;
  }

  buildForm(): FormGroup {
    if (this.isRegister) {
      return this.fb.group({
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        avatar: [null],
      });
    }
    return this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  toggleMode() {
    this.isRegister = !this.isRegister;
    this.error = '';
    this.selectedAvatar = null;
    this.form = this.buildForm();
  }

  selectAvatar(url: string) {
    this.selectedAvatar = this.selectedAvatar === url ? null : url;
    this.form.get('avatar')?.setValue(this.selectedAvatar);
  }

  submit() {
    if (this.form.invalid) return;
    this.loading = true;
    this.error = '';

    const { email, password, username, avatar } = this.form.value;
    const req$ = this.isRegister
      ? this.auth.register(email, password, username, avatar)
      : this.auth.login(email, password);

    req$.subscribe({
      next: () => {
        const returnUrl =
          this.route.snapshot.queryParamMap.get('returnUrl') || '/dashboard';
        this.router.navigateByUrl(returnUrl);
        this.loading = false;
      },
      error: (err) => {
        this.error =
          err?.error?.message ||
          (this.isRegister
            ? 'Registration failed'
            : 'Invalid email or password');
        this.loading = false;
      },
    });
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle();
  }
}
