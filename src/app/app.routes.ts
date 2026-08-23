import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Pages/home-component/home-component';
import { ProjectsPage } from './Components/Pages/projects-page/projects-page';
import { ProjectDetailPage } from './Components/Pages/project-detail-page/project-detail-page';
import { ServicesPage } from './Components/Pages/services-page/services-page';
import { ExperiencePage } from './Components/Pages/experience-page/experience-page';
import { ContactPage } from './Components/Pages/contact-page/contact-page';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'proyectos', component: ProjectsPage },
  { path: 'proyectos/:slug', component: ProjectDetailPage },
  { path: 'servicios', component: ServicesPage },
  { path: 'experiencia', component: ExperiencePage },
  { path: 'contacto', component: ContactPage },
  { path: '**', redirectTo: '' },
];
