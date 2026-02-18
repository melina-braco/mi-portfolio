import { Component, OnInit, inject } from '@angular/core'; 
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter } from 'rxjs';
import { FooterComponent } from "./pages/footer/footer.component";
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private titleService = inject(Title);
  private metaService = inject(Meta);

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateSeoTags();
    });
  }

  private updateSeoTags() {
    const url = this.router.url;
    let title = 'Mbraco Web | Desarrollo Senior';
    let desc = 'Desarrollo de software de alto impacto especializado en Angular y Dart.';

    if (url.includes('proyectos')) {
      title = 'Proyectos | Mbraco Web';
      desc = 'Explorá nuestro portfolio de soluciones digitales y apps móviles.';
    } else if (url.includes('cotizacion')) {
      title = 'Cotizador Online | Presupuesto Web';
      desc = 'Configurá tu proyecto y obtené una inversión estimada en segundos.';
    } else if (url.includes('analyticsDashboard')) {
      title = 'Métricas y Rendimiento | Mbraco Web';
      desc = 'Visualizá el impacto y las estadísticas de nuestra plataforma en tiempo real.';
    } else if (url.includes('contacto')) {
      title = 'Contacto | Mbraco Web';
      desc = '¿Tenés una idea en mente? Ponete en contacto con nosotros.';
    }

    this.titleService.setTitle(title);
    this.metaService.updateTag({ name: 'description', content: desc });
  }
}