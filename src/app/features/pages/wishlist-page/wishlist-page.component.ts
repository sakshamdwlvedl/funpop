import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from '../explore/explore.component';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [CommonModule, ExploreComponent],
  templateUrl: './wishlist-page.component.html',
  styleUrls: ['./wishlist-page.component.scss'],
})
export class WishlistPageComponent {}
