import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from "@angular/common/http";
import { AuthRoutingModule } from "./auth.routing.module"

import { LoginComponent } from "./login/login.component"
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component"
import { ChangepasswordComponent } from "./changepassword/changepassword.component"
import { RegisterComponent } from "./register/register.component"

import { AuthService } from "../services/auth.service";

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [LoginComponent, ForgotpasswordComponent, ChangepasswordComponent, RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HttpClientModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
