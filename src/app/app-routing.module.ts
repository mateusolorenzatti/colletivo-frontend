import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { RedirectIfLoggedGuard } from './core/auth/redirect-if-logged.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignInComponent,
    canActivate: [RedirectIfLoggedGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule)
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
