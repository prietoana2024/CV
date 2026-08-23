import { Component, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MediaPlaceholder } from '../../Shared/media-placeholder/media-placeholder';
import { getProjectBySlug, PROJECTS, Project } from '../../../data/projects.data';

@Component({
  selector: 'app-project-detail-page',
  standalone: true,
  imports: [RouterLink, MediaPlaceholder],
  templateUrl: './project-detail-page.html',
  styleUrl: './project-detail-page.css',
})
export class ProjectDetailPage {
  readonly project = signal<Project | undefined>(undefined);
  readonly nextProject = signal<Project | undefined>(undefined);

  constructor(route: ActivatedRoute) {
    route.paramMap.subscribe((params) => {
      const slug = params.get('slug') ?? '';
      const current = getProjectBySlug(slug);
      this.project.set(current);

      if (current) {
        const idx = PROJECTS.findIndex((p) => p.slug === current.slug);
        this.nextProject.set(PROJECTS[(idx + 1) % PROJECTS.length]);
      }

      if (typeof window !== 'undefined') window.scrollTo({ top: 0 });
    });
  }
}
