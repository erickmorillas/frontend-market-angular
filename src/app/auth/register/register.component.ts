import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
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
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required])
    });
  }

  register() {
    if (this.myForm.valid) {

      if (this.myForm.value.password1 == this.myForm.value.password2) {

        this.authService.register(this.myForm.value).subscribe((res: any) => {

          this.authService.login({ username: this.myForm.value.username, password: this.myForm.value.password1 }).subscribe((res: any) => {

            this.router.navigateByUrl('/home')
          }, (err: any) => {
            console.error(err.error);
            alert("we could not enter, go to login :/")
          });

        }, (err: any) => {
          console.error(err.error);
          alert("We could not register :/")
        });

      } else {
        alert("Passwords do not match")
      }

    }
  }

}
