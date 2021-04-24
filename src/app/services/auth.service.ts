import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { UserI } from "../models/user"
import { JwtResponseI } from "../models/jwt-response"
import { tap } from "rxjs/operators"
import { Observable, BehaviorSubject } from "rxjs"
import { environment } from '../../environments/environment';

import { TokenService } from './token.service';

import { ProductsService } from "./product.service"

@Injectable()

export class AuthService {
  constructor(
    private service: ProductsService,
    private httpClient: HttpClient,
    private token: TokenService) {
  }

  login(user: UserI): Observable<JwtResponseI> {

    return this.httpClient.post<JwtResponseI>(`${environment.baseUrl}auth/login`, user).pipe(tap(
      (res: JwtResponseI) => {
        if (res) {
          //this.saveToken(res.body.data, res.body.token);
          this.token.saveToken(res.body.data, res.body.token);
          this.service.getAllProducts()
        }
      }, (err => {
        alert(`${err.statusText} incorrect username or password`)
      })
    ))
  }

  forgotPassword(email: string) {
    return this.httpClient.post(`${environment.baseUrl}auth/forgotPassword`, email);
  }

  changePassword(id: any, password: any) {
    return this.httpClient.post(`${environment.baseUrl}auth/changePassword`, {
      id: id,
      password: password
    });
  }

  logout() {
    return this.token.removeToken();
  }
}
