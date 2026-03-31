import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  /**
   * Updates the page title and meta tags.
   * @param title New page title
   * @param description New page description
   */
  updateMeta(title: string, description: string = '') {
    const fullTitle = `${title} | FunPop`;
    this.title.setTitle(fullTitle);

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: fullTitle });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'twitter:title', content: fullTitle });
    this.meta.updateTag({ property: 'twitter:description', content: description });
  }

  /**
   * Resets meta tags to default values.
   */
  resetMeta() {
    this.title.setTitle('FunPop - Explore Movies, Series and Celebrities');
    this.meta.updateTag({
      name: 'description',
      content:
        'FunPop is your ultimate destination to explore the latest movies, trending TV series, and your favorite celebrities.',
    });
  }
}
