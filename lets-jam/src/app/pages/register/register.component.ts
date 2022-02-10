import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NewUser } from 'src/app/model/new-user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  user!: NewUser;

  constructor(public formBuilder: FormBuilder, private authService: AuthService, private router: Router) {  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
      ])),
      lastname: new FormControl('', Validators.compose([
      ])),
      username: new FormControl('', Validators.compose([
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ]))
    });
  }

  onSubmit() {
    if(this.registerForm.valid){
      this.user = this.registerForm.value;
      this.authService.addUser(this.user).subscribe( (response) => {
        this.router.navigate(['/home']);
      });
    }
  }

}
