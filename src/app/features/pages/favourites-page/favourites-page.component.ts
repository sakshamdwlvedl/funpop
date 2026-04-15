import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExploreComponent } from '../explore/explore.component';

@Component({
  selector: 'app-favourites-page',
  standalone: true,
  imports: [CommonModule, ExploreComponent],
  templateUrl: './favourites-page.component.html',
  styleUrls: ['./favourites-page.component.scss'],
})
export class FavouritesPageComponent {}
