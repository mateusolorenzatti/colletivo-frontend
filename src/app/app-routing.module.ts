import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignInComponent
  }
];

/*
  {
    path: 'routes',
    loadChildren: () => import('src/app/routes/routes.module').then(m => m.RoutesModule)
  },
  {
    path: 'stops',
    loadChildren: () => import('src/app/stops/stops.module').then(m => m.StopsModule)
  },
  {
    path: 'trips',
    loadChildren: () => import('src/app/trips/trips.module').then(m => m.TripsModule)
  }
*/

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
