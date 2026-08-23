import { Component } from '@angular/core';

@Component({
  selector: 'app-whatsapp-bubble',
  standalone: true,
  templateUrl: './whatsapp-bubble.html',
  styleUrl: './whatsapp-bubble.css',
})
export class WhatsappBubble {
  private readonly phone = '573002673467';
  private readonly message = 'Hola Ana, vi tu portafolio y quiero hablar sobre un proyecto.';

  readonly href = `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
}
