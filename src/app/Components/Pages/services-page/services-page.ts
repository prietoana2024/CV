import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SERVICES, SKILLS } from '../../../data/skills.data';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [RouterLink, DecimalPipe],
  templateUrl: './services-page.html',
  styleUrl: './services-page.css',
})
export class ServicesPage {
  readonly services = SERVICES;
  readonly skills = SKILLS;
}
