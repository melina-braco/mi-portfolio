import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  initChatbot() {
    // Solo ejecutamos si estamos en el cliente (Browser)
    if (isPlatformBrowser(this.platformId)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = 'https://embed.tawk.to/67b21617c0df611910620248/1iklre5un'; 
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);
    }
  }
}