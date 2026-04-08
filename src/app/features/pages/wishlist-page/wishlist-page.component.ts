import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { ApiCallService } from '../../../core/services/api-call.service';
import { MovieCardComponent } from '../../../shared/components/movie-card/movie-card.component';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, DragDropModule, MovieCardComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss']
})
export class WishlistPageComponent implements OnInit {
  wishlist: any[] = [];
  loading = true;

  constructor(
    private apiService: ApiCallService,
    private seo: SeoService
  ) {}

  ngOnInit() {
    this.seo.updateMeta('My Wishlist - FunPop', 'Manage your watchlist and set priorities.');
    this.fetchWishlist();
  }

  fetchWishlist() {
    this.loading = true;
    this.apiService.getWishlist().subscribe({
      next: (res) => {
        this.wishlist = res.map((item: any) => ({
          ...item,
          id: item.mediaId,
          poster_path: item.posterPath,
          title: item.title,
          media_type: item.mediaType,
          vote_average: item.voteAverage,
          release_date: item.releaseDate
        }));
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.wishlist, event.previousIndex, event.currentIndex);
    // Optionally save the new order to the backend if an API exists
    // this.apiService.updateWishlistOrder(this.wishlist).subscribe();
  }
}
