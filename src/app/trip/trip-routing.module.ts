import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginRequiredGuard } from "../core/auth/login-required.guard";
import { TripDetailComponent } from "./trip-detail/trip-detail.component";
import { TripListComponent } from "./trip-list/trip-list.component";

const routes: Routes = [
    {
        path: '',
        component: TripListComponent,
        canActivate: [LoginRequiredGuard]
    },
    {
        path: ':trip_id',
        component: TripDetailComponent,
        canActivate: [LoginRequiredGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class TripRoutingModule { }