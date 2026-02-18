import { Component, OnInit, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Location, CommonModule } from '@angular/common'; // Agregado Location aquí
import { filter } from 'rxjs';
import { ChatbotService } from '../../chatboot.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent implements OnInit { // Agregado implements OnInit
  isHome = true;

  private chatbotService = inject(ChatbotService);
  private router = inject(Router);
  private location = inject(Location);

  ngOnInit() {
    this.chatbotService.initChatbot();
    this.initRouterEvents();
  }

  private initRouterEvents() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const currentUrl = event.urlAfterRedirects;
      this.isHome = currentUrl === '/' || currentUrl === '/home';
    });
  }

  goBack(): void {
    this.location.back();
  }
}