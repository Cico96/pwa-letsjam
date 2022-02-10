import { HttpHeaderResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthLoginBody } from 'src/app/model/auth-login-body';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authBody!: AuthLoginBody;
  loginForm!: FormGroup;
  constructor(public formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(30),
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });
  }

  onSubmit(){
    if(this.loginForm.valid) {

      this.authBody = this.loginForm.value
      this.authService.login(this.authBody, 'response').subscribe( (response) => {
        if(response.status === 401) {
          this.router.navigate(['/home']);
        }else {
          let token = response.headers.get('Authorization')?.split(' ')[1];
          if (token != undefined) {
            window.localStorage.setItem('token', token)
            this.router.navigate(['/home']);
          }
        }
      });

    }
  }

}
