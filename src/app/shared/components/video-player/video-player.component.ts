import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [CommonModule, DialogModule],
  template: `
    <p-dialog
      [(visible)]="visible"
      [modal]="true"
      [draggable]="false"
      [resizable]="false"
      [blockScroll]="true"
      maskStyleClass="video-player-mask"
      styleClass="video-player-dialog"
      (onHide)="close()"
      [dismissableMask]="true"
    >
      <div 
        class="video-player-wrapper" 
        *ngIf="videoKeys.length > 0" 
        (click)="close()"
      >
        <!-- Close Button -->
        <button 
          class="nav-btn close-btn" 
          (click)="close(); $event.stopPropagation()" 
          aria-label="Close"
        >
          <i class="pi pi-times"></i>
        </button>

        <!-- Navigation Arrows -->
        <button 
          *ngIf="videoKeys.length > 1"
          class="nav-btn prev-btn" 
          (click)="prev($event)" 
          aria-label="Previous"
        >
          <i class="pi pi-angle-left"></i>
        </button>

        <div class="video-container" (click)="$event.stopPropagation()">
          <iframe
            *ngIf="videoUrl"
            [src]="videoUrl"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            class="video-iframe"
          ></iframe>
        </div>

        <div class="video-counter" *ngIf="videoKeys.length > 1">
          {{ currentIndex + 1 }} / {{ videoKeys.length }}
        </div>

        <button 
          *ngIf="videoKeys.length > 1"
          class="nav-btn next-btn" 
          (click)="next($event)" 
          aria-label="Next"
        >
          <i class="pi pi-angle-right"></i>
        </button>
      </div>
    </p-dialog>
  `,
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent {
  @Input() visible: boolean = false;
  @Input() videoKeys: string[] = [];
  @Input() set currentIndex(index: number) {
    this._currentIndex = index;
    this.updateVideoUrl();
  }
  get currentIndex(): number {
    return this._currentIndex;
  }

  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() currentIndexChange = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();

  private _currentIndex = 0;
  videoUrl?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (!this.visible) return;
    
    if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.prev();
    } else if (event.key === 'Escape') {
      this.close();
    }
  }

  private updateVideoUrl() {
    const key = this.videoKeys[this.currentIndex];
    if (key) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
        `https://www.youtube.com/embed/${key}?autoplay=1&rel=0`
      );
    } else {
      this.videoUrl = undefined;
    }
  }

  next(event?: Event) {
    if (event) event.stopPropagation();
    if (this.videoKeys.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.videoKeys.length;
    this.currentIndexChange.emit(this.currentIndex);
  }

  prev(event?: Event) {
    if (event) event.stopPropagation();
    if (this.videoKeys.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.videoKeys.length) % this.videoKeys.length;
    this.currentIndexChange.emit(this.currentIndex);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onClose.emit();
  }
}
