import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'co-sign-in',
  templateUrl: './sign-in.component.html'
})
export class SignInComponent {
  loginForm: FormGroup;
  loginErro: Boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {

    this.loginForm = this.formBuilder.group({
      userName: ['', Validators.required],
      userPass: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login() {

    const username = this.loginForm.get('userName')?.value;
    const password = this.loginForm.get('userPass')?.value;

    //console.log(userEmail + password);

    this.authService
      .authenticate(username, password)
      .subscribe(
        () => this.router.navigate(['home']),
        err => {
          console.log(err);
          this.loginForm.reset();
          this.loginErro = true;
        }
      );
  }
}
