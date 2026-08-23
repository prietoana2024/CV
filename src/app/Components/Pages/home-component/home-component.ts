import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ThreeScene } from '../../three-scene/three-scene';
import { MediaPlaceholder } from '../../Shared/media-placeholder/media-placeholder';
import { PROJECT_CATEGORIES, PROJECTS } from '../../../data/projects.data';
import { SERVICES } from '../../../data/skills.data';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [RouterLink, ThreeScene, MediaPlaceholder],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {
  isBrowser = false;
  showAnimation = true;

  readonly categories = PROJECT_CATEGORIES;
  readonly featuredProjects = PROJECTS.filter((p) => p.featured).slice(0, 3);
  readonly services = SERVICES.slice(0, 3);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      setTimeout(() => {
        this.showAnimation = false;
        this.cdr.detectChanges();
      }, 3300);
    } else {
      this.showAnimation = false;
    }
  }

  skipIntro(): void {
    this.showAnimation = false;
  }
}
