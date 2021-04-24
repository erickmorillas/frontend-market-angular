import { Component, NgModule, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
  myForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  forgotPassword() {
    if (this.myForm.valid) {
      console.log(this.myForm.value);
      this.authService.forgotPassword(this.myForm.value).subscribe((res: any) => {
        console.log(res.body);
        alert(res.body)
      }, (err) => {
        console.error(err.error.body);
        alert(err.error.body)
      });

    }
  }

}
