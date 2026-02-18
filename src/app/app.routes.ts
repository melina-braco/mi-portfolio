import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactoComponent } from './pages/nav-bar/widgets/contacto/contacto.component';
import { ProyectosComponent } from './pages/home/widgets/proyectos/proyectos.component';
import { CotizacionComponent } from './pages/home/widgets/cotizacion/cotizacion.component';
import { AnalyticsDashboardComponent } from './pages/nav-bar/widgets/analitycs-dashboard/analitycs-dashboard.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'analyticsDashboard', component: AnalyticsDashboardComponent },
  { path: 'proyectos', component: ProyectosComponent }, 
  { path: 'cotizacion', component: CotizacionComponent },
  { path: '**', redirectTo: 'home' } 
];