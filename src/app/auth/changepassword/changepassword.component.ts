import { Component, NgModule, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  myForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private rutaActiva: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.myForm = new FormGroup({
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    });
  }

  changePassword() {
    if (this.myForm.valid) {
      if (this.myForm.value.password1 == this.myForm.value.password2) {
        this.authService.changePassword(this.rutaActiva.snapshot.params.id, this.myForm.value.password1).subscribe((res: any) => {
          console.log(res);
          alert(res.body)

          this.router.navigateByUrl('/')
        }, (err: any) => {
          console.error(err.error);
          alert(err.error.error)
        });

      } else {
        alert("Passwords do not match")
      }
    }
  }

}
