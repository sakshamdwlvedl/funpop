import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-image-viewer',
  standalone: true,
  imports: [CommonModule, DialogModule],
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
})
export class ImageViewerComponent {
  @Input() visible: boolean = false;
  @Input() images: string[] = [];
  @Input() currentIndex: number = 0;
  @Input() caption?: string;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() currentIndexChange = new EventEmitter<number>();
  @Output() onClose = new EventEmitter<void>();

  imageBase = environment.TMDB_IMG_BASE;

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

  next(event?: Event) {
    if (event) event.stopPropagation();
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.currentIndexChange.emit(this.currentIndex);
  }

  prev(event?: Event) {
    if (event) event.stopPropagation();
    if (this.images.length <= 1) return;
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.currentIndexChange.emit(this.currentIndex);
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(false);
    this.onClose.emit();
  }
}
