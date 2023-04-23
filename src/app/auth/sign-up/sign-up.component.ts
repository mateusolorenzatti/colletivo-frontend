import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { User } from 'src/app/core/entities/user/user';
import { UserService } from 'src/app/core/entities/user/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent {
  newUserForm: FormGroup;
  error: boolean = false;
  help: boolean = false;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router) {

    this.newUserForm = this.formBuilder.group({
      userName: [null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      firstName: [null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      lastName: [null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(80)
        ]
      ],
      userEmail: [null,
        [
          Validators.required,
          Validators.email
        ]
      ],
      userPass: [null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ],
      confirmUserPass: [null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(40)
        ]
      ]
    });
  }

  ngOnInit(): void { }

  createUser() {
    const user = {
      username: this.newUserForm.get('userName')?.value,
      firstName: this.newUserForm.get('firstName')?.value,
      lastName: this.newUserForm.get('lastName')?.value,
      email: this.newUserForm.get('userEmail')?.value,
      password: this.newUserForm.get('userPass')?.value
    } satisfies User

    console.log(user)

    this.help = true;

    if (user.password != this.newUserForm.get('confirmUserPass')?.value) {
      //this.newUserForm.reset();
      this.errorMessage = "Passwords don't match."
      this.error = true;
      this.help = false;
      return;
    }
    
    this.userService
    .signUp(user)
    .subscribe(
      () => this.router.navigate(['']),
      err => {
          console.log(err);
          //this.newUserForm.reset();
          this.errorMessage = err.error.message
          this.error = true;
          this.help = false;
        }
      );

  }
}
