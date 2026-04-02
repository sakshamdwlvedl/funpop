import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieDetails } from '../../interfaces/movie-detail.interface';
import { environment } from '../../../../environments/environment';
import { VideoPlayerComponent } from '../../../shared/components/video-player/video-player.component';
import { ImageViewerComponent } from '../../../shared/components/image-viewer/image-viewer.component';

@Component({
  selector: 'app-media-gallery',
  standalone: true,
  imports: [CommonModule, VideoPlayerComponent, ImageViewerComponent],
  templateUrl: './media-gallery.component.html',
  styleUrls: ['./media-gallery.component.scss']
})
export class MediaGalleryComponent implements OnInit {
  details!: MovieDetails;
  galleryType: 'images' | 'videos' = 'images';
  imageBase = environment.TMDB_IMG_BASE;

  videoPlayer = {
    visible: false,
    keys: [] as string[],
    currentIndex: 0,
  };

  imageViewer = {
    visible: false,
    images: [] as string[],
    currentIndex: 0,
    caption: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Check both current and parent data for details
    this.details = this.route.snapshot.data['details'] || this.route.parent?.snapshot.data['details'];
    
    this.route.queryParams.subscribe(params => {
      this.galleryType = params['galleryType'] || 'videos';
    });
  }

  playVideo(index: number) {
    this.videoPlayer.keys = this.details.videos.results.map((v) => v.key);
    this.videoPlayer.currentIndex = index;
    this.videoPlayer.visible = true;
  }

  viewImage(index: number, caption: string = '') {
    this.imageViewer.images = this.details.images.backdrops.map(
      (img) => img.file_path,
    );
    this.imageViewer.currentIndex = index;
    this.imageViewer.caption = caption;
    this.imageViewer.visible = true;
  }

  setGalleryType(type: 'images' | 'videos') {
    this.galleryType = type;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { galleryType: type },
      queryParamsHandling: 'merge',
      replaceUrl: true
    });
  }
}
