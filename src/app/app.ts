import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './Components/Layout/menu-component/menu-component';
import { FooterComponent } from './Components/Layout/footer-component/footer-component';
import { WhatsappBubble } from './Components/Shared/whatsapp-bubble/whatsapp-bubble';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, FooterComponent, WhatsappBubble],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'CV';
}
