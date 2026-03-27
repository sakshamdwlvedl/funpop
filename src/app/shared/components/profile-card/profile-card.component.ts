import { Component, Input } from '@angular/core';
import {
  Cast,
  Crew,
} from '../../../features/interfaces/movie-detail.interface';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-card',
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: Cast | Crew;
  imageBase = environment.TMDB_IMG_BASE;

  constructor(private router: Router) {}

  get role(): string {
    if ('character' in this.profile) {
      return this.profile.character;
    }
    return this.profile.job;
  }

  navigateToPerson(): void {
    if (this.profile?.id) {
      this.router.navigate(['/details/person', this.profile.id]);
    }
  }
}
