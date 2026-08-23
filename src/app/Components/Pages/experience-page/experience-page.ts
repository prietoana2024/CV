import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EDUCATION, EXPERIENCE } from '../../../data/experience.data';

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './experience-page.html',
  styleUrl: './experience-page.css',
})
export class ExperiencePage {
  readonly experience = EXPERIENCE;
  readonly education = EDUCATION;
}
