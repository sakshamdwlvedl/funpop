import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loader',
  imports: [],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
  host: {
    '[class.full-screen]': 'showOnFullScreen',
  },
})
export class LoaderComponent {
  @Input() showOnFullScreen: boolean = true;
}
