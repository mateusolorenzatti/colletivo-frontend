import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginRequiredGuard } from "../core/auth/login-required.guard";
import { CreateRouteComponent } from "./create-route/create-route.component";

const routes: Routes = [
    {
        path: 'create',
        component: CreateRouteComponent,
        canActivate: [LoginRequiredGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class RouteRoutingModule { }