import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./login/login.component"
import { ChangepasswordComponent } from "./changepassword/changepassword.component"
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component"
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'forgotpassword', component: ForgotpasswordComponent },
    { path: 'changepassword/:id', component: ChangepasswordComponent },
    { path: 'register', component: RegisterComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }