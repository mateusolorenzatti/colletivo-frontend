import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { LoginRequiredGuard } from './core/auth/login-required.guard';
import { RedirectIfLoggedGuard } from './core/auth/redirect-if-logged.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: SignInComponent,
    canActivate: [RedirectIfLoggedGuard]
  },
  // ToDo: Create child roude for home module
  {  
    path: 'home',
    pathMatch: 'full',
    component: HomeComponent,
    canActivate: [LoginRequiredGuard]
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
