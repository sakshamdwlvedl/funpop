// src/app/features/pages/person-detail-page/person-detail-page.component.ts

import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChild,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { environment } from '../../../../environments/environment';
import { RatingComponent } from '../../../shared/components/rating/rating.component';
import {
  CreditItem,
  PersonDetail,
} from '../../interfaces/person-detail.interface';
import { SeoService } from '../../../core/services/seo.service';

type FilmographyFilter = 'all' | 'movie' | 'tv';

@Component({
  selector: 'app-person-detail-page',
  standalone: true,
  imports: [CommonModule, RatingComponent],
  templateUrl: './person-detail-page.component.html',
  styleUrls: ['./person-detail-page.component.scss'],
})
export class PersonDetailPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  details!: PersonDetail;
  imageBase = environment.TMDB_IMG_BASE;

  // ── Derived state ──────────────────────────────────────────────────────────
  age: number | null = null;
  bioExpanded = false;
  filmographyFilter: FilmographyFilter = 'all';
  selectedImageIndex: number | null = null;

  sortedFilmography: CreditItem[] = [];
  filteredFilmography: CreditItem[] = [];
  knownFor: CreditItem[] = [];

  genderLabel = '';

  socialLinks: { icon: string; label: string; url: string }[] = [];

  @ViewChild('heroSection') heroSection!: ElementRef;
  @ViewChildren('fadeItem') fadeItems!: QueryList<ElementRef>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private seo: SeoService,
  ) {}

  // ── Lifecycle ──────────────────────────────────────────────────────────────

  ngOnInit(): void {
    this.details = this.route.snapshot.data['details'];
    this.computeDerived();

    this.seo.updateMeta(
      this.details.name,
      this.details.biography?.substring(0, 160) ||
        `Learn more about ${this.details.name}.`,
    );
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initAnimations();
      ScrollTrigger.refresh();
    }, 100);
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((t) => t.kill());
  }

  // ── Derived data ───────────────────────────────────────────────────────────

  private computeDerived(): void {
    // Age
    if (this.details.birthday) {
      const end = this.details.deathday
        ? new Date(this.details.deathday)
        : new Date();
      const birth = new Date(this.details.birthday);
      this.age = Math.floor(
        (end.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24 * 365.25),
      );
    }

    // Gender
    const genderMap: Record<number, string> = {
      0: 'Unknown',
      1: 'Female',
      2: 'Male',
      3: 'Non-binary',
    };
    this.genderLabel = genderMap[this.details.gender] ?? '';

    // Known for — top 12 by popularity, deduplicated
    const seen = new Set<number>();
    this.knownFor = [...this.details.combined_credits.cast]
      .sort((a, b) => b.popularity - a.popularity)
      .filter((item) => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })
      .slice(0, 12);

    // Full filmography — cast + crew merged, sorted by date desc
    const allCredits = [
      ...this.details.combined_credits.cast.map((c) => ({
        ...c,
        role: 'cast' as const,
      })),
      ...this.details.combined_credits.crew.map((c) => ({
        ...c,
        role: 'crew' as const,
      })),
    ];

    const seenFull = new Set<string>();
    this.sortedFilmography = allCredits
      .filter((item) => {
        const key = `${item.id}-${item.media_type}-${(item as any).character ?? item.job}`;
        if (seenFull.has(key)) return false;
        seenFull.add(key);
        return true;
      })
      .sort((a, b) => {
        const dateA = a.release_date ?? a.first_air_date ?? '';
        const dateB = b.release_date ?? b.first_air_date ?? '';
        return dateB.localeCompare(dateA);
      });

    this.applyFilmographyFilter();

    // Social links
    const ext = this.details.external_ids;
    if (ext.imdb_id) {
      this.socialLinks.push({
        icon: 'imdb',
        label: 'IMDb',
        url: `https://www.imdb.com/name/${ext.imdb_id}`,
      });
    }
    if (ext.instagram_id) {
      this.socialLinks.push({
        icon: 'instagram',
        label: 'Instagram',
        url: `https://instagram.com/${ext.instagram_id}`,
      });
    }
    if (ext.twitter_id) {
      this.socialLinks.push({
        icon: 'twitter',
        label: 'Twitter / X',
        url: `https://twitter.com/${ext.twitter_id}`,
      });
    }
    if (ext.facebook_id) {
      this.socialLinks.push({
        icon: 'facebook',
        label: 'Facebook',
        url: `https://facebook.com/${ext.facebook_id}`,
      });
    }
    if (ext.wikidata_id) {
      this.socialLinks.push({
        icon: 'wikipedia',
        label: 'Wikipedia',
        url: `https://www.wikidata.org/wiki/${ext.wikidata_id}`,
      });
    }
  }

  // ── Filmography filter ─────────────────────────────────────────────────────

  applyFilmographyFilter(): void {
    this.filteredFilmography =
      this.filmographyFilter === 'all'
        ? this.sortedFilmography
        : this.sortedFilmography.filter(
            (item) => item.media_type === this.filmographyFilter,
          );
  }

  setFilter(filter: FilmographyFilter): void {
    this.filmographyFilter = filter;
    this.applyFilmographyFilter();
  }

  // ── Image lightbox ─────────────────────────────────────────────────────────

  openImage(index: number): void {
    this.selectedImageIndex = index;
    document.body.style.overflow = 'hidden';
  }

  closeImage(): void {
    this.selectedImageIndex = null;
    document.body.style.overflow = '';
  }

  prevImage(): void {
    if (this.selectedImageIndex === null) return;
    const total = this.details.images.profiles.length;
    this.selectedImageIndex = (this.selectedImageIndex - 1 + total) % total;
  }

  nextImage(): void {
    if (this.selectedImageIndex === null) return;
    const total = this.details.images.profiles.length;
    this.selectedImageIndex = (this.selectedImageIndex + 1) % total;
  }

  // ── Animations ─────────────────────────────────────────────────────────────

  private initAnimations(): void {
    // Hero entrance
    gsap.from('.person-hero', {
      opacity: 0,
      y: 30,
      duration: 0.9,
      ease: 'power3.out',
    });

    // Stagger all fade items on scroll
    this.fadeItems.forEach((el) => {
      gsap.from(el.nativeElement, {
        opacity: 0,
        y: 40,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el.nativeElement,
          start: 'top 90%',
        },
      });
    });
  }

  // ── Template helpers ───────────────────────────────────────────────────────

  getDisplayTitle(item: CreditItem): string {
    return item.title ?? item.name ?? 'Untitled';
  }

  getYear(item: CreditItem): string {
    const date = item.release_date ?? item.first_air_date;
    return date ? new Date(date).getFullYear().toString() : '—';
  }

  getRoleLabel(item: any): string {
    if (item.character) return item.character;
    if (item.job) return item.job;
    return this.details.known_for_department;
  }

  navigateToMedia(item: CreditItem): void {
    this.router.navigate(['/details', item.media_type, item.id]);
  }

  getSocialIconClass(icon: string): string {
    const map: Record<string, string> = {
      imdb: 'pi pi-video',
      instagram: 'pi pi-instagram',
      twitter: 'pi pi-twitter',
      facebook: 'pi pi-facebook',
      wikipedia: 'pi pi-globe',
    };
    return map[icon] ?? 'pi pi-link';
  }

  trackById(_: number, item: any): any {
    return item.id;
  }

  get profileImages() {
    return this.details.images.profiles.slice(0, 20);
  }

  get movieCount(): number {
    return this.sortedFilmography.filter((i) => i.media_type === 'movie')
      .length;
  }

  get tvCount(): number {
    return this.sortedFilmography.filter((i) => i.media_type === 'tv').length;
  }
}
