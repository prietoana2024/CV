import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ContactModel {
  name: string;
  company: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-page.html',
  styleUrl: './contact-page.css',
})
export class ContactPage {
  readonly model: ContactModel = { name: '', company: '', email: '', message: '' };
  readonly sent = signal(false);

  submit(): void {
    const subject = encodeURIComponent(`Proyecto — ${this.model.company || this.model.name}`);
    const body = encodeURIComponent(
      `Nombre: ${this.model.name}\nEmpresa: ${this.model.company}\nEmail: ${this.model.email}\n\n${this.model.message}`
    );

    window.location.href = `mailto:prietoanasoftware@gmail.com?subject=${subject}&body=${body}`;
    this.sent.set(true);
  }
}
