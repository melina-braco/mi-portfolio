import { Component } from '@angular/core'; 
import { RouterOutlet } from '@angular/router'; // Importamos RouterOutlet
import { FooterComponent } from "./pages/footer/footer.component";
import { NavBarComponent } from './pages/nav-bar/nav-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  // Agregado RouterOutlet a la lista de imports
  imports: [NavBarComponent, FooterComponent, RouterOutlet], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // Ahora el componente está limpio y delega la lógica a los hijos
}