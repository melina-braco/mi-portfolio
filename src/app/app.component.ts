import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser'; // <-- Importamos esto
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  constructor(private titleService: Title) {} // <-- Inyectamos el servicio

  ngOnInit() {
    // Esto es lo que verá Google en la pestaña del navegador
    this.titleService.setTitle('Hola Mundo');
  }
}