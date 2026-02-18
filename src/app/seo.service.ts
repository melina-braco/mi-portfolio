import { Injectable, inject } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private title = inject(Title);
  private meta = inject(Meta);

  setMetaTags(config: { title: string, description: string }) {
    // Setea el <title> de la pestaña
    this.title.setTitle(`${config.title} | Mbraco Web`);
    
    // Setea la <meta name="description">
    this.meta.updateTag({ name: 'description', content: config.description });
    
    // Configura Open Graph (para que cuando compartas el link en WhatsApp/IG se vea lindo)
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
  }
}