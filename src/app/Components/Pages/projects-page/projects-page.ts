import { Component, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { MediaPlaceholder } from '../../Shared/media-placeholder/media-placeholder';
import { PROJECT_CATEGORIES, PROJECTS, ProjectCategory } from '../../../data/projects.data';

type FilterId = ProjectCategory | 'all';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [RouterLink, MediaPlaceholder],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css',
})
export class ProjectsPage {
  readonly categories = PROJECT_CATEGORIES;
  readonly allProjects = PROJECTS;
  readonly activeFilter = signal<FilterId>('all');

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    if (filter === 'all') return this.allProjects;
    return this.allProjects.filter((p) => p.category === filter);
  });

  constructor(route: ActivatedRoute) {
    route.queryParamMap.subscribe((params) => {
      const categoria = params.get('categoria') as FilterId | null;
      this.activeFilter.set(categoria ?? 'all');
    });
  }

  setFilter(id: FilterId): void {
    this.activeFilter.set(id);
  }
}
