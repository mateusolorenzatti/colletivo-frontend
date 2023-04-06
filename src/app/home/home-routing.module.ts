import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RedirectIfLoggedGuard } from "../core/auth/redirect-if-logged.guard";
import { HomeComponent } from "./home.component";
import { LoginRequiredGuard } from "../core/auth/login-required.guard";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent,
        canActivate: [LoginRequiredGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class HomeRoutingModule { }