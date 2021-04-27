import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenService } from "../../services/token.service"

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private user: TokenService
  ) { }

  username: string = '';

  ngOnInit(): void {
    this.username = JSON.parse(this.user.getUser() || "").username;
  }

  logout(): void {
    this.user.removeToken();
    this.router.navigateByUrl('/')

  }

}

