import { Component } from '@angular/core';
import { WorkingInProgressComponent } from '../../../../working-in-progress/working-in-progress.component';

@Component({
  selector: 'app-proyectos',
  standalone: true,
  imports: [WorkingInProgressComponent],
  templateUrl: './proyectos.component.html',
  styleUrl: './proyectos.component.scss'
})
export class ProyectosComponent {

}
