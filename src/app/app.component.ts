import { Component } from '@angular/core';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isHome = true;

  // Inyectamos 'location' para poder usar el historial del navegador
  constructor(
    private router: Router, 
    private location: Location
  ) {
    this.initRouterEvents();
  }

  private initRouterEvents() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Usamos urlAfterRedirects porque es la URL final real
      const currentUrl = event.urlAfterRedirects;
      this.isHome = currentUrl === '/' || currentUrl === '/home';
    });
  }

  // Método para el botón "Volver"
  goBack(): void {
    this.location.back();
  }
}