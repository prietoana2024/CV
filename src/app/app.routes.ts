/*import { Routes } from '@angular/router';

export const routes: Routes = [];
*/
import { Routes } from '@angular/router';
import { HomeComponent } from './Components/Pages/home-component/home-component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];