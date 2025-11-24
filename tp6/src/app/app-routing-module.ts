import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeteoComponent } from './meteo/meteo.component';
import { MeteoDetailComponent } from './meteo-detail/meteo-detail';

const routes: Routes = [
  {
    path: '',
    component: MeteoComponent,         // page principale : formulaire + liste
  },
  {
    path: 'meteo/:name',               // détail météo pour une ville
    component: MeteoDetailComponent,
  },
  {
    path: '**',
    redirectTo: '/',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      enableTracing: true,             // pour voir les navigations dans la console
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}


