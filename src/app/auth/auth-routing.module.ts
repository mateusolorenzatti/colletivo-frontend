import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RedirectIfLoggedGuard } from "../core/auth/redirect-if-logged.guard";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
    {
        path: 'signin',
        component: SignInComponent,
        canActivate: [RedirectIfLoggedGuard]
    },
    {
        path: 'signup',
        component: SignUpComponent,
        canActivate: [RedirectIfLoggedGuard]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AuthRoutingModule { }