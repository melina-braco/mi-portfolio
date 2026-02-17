import { Component, OnInit, inject } from '@angular/core'; // Agregamos inject y OnInit
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { Location, CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';
import { ChatbotService } from './chatboot.service';
import { FooterComponent } from "./pages/footer/footer.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
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