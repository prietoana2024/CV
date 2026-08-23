import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService } from '../../../services/theme.service';

interface NavItem {
  label: string;
  path: string;
}

@Component({
  selector: 'app-menu-component',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu-component.html',
  styleUrl: './menu-component.css',
})
export class MenuComponent {
  constructor(readonly themeService: ThemeService) {}

  readonly navItems: NavItem[] = [
    { label: 'Inicio', path: '/' },
    { label: 'Proyectos', path: '/proyectos' },
    { label: 'Servicios', path: '/servicios' },
    { label: 'Experiencia', path: '/experiencia' },
    { label: 'Contacto', path: '/contacto' },
  ];

  readonly menuOpen = signal(false);
  readonly scrolled = signal(false);

  toggleMenu(): void {
    this.menuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
