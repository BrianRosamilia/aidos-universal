import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../auth/auth.service';

import { GLOBAL_CONFIG, GlobalConfig } from '../../config';

@Component({
  selector: 'aidos-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService, @Inject(GLOBAL_CONFIG) public config: GlobalConfig) {
    this.form = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(50)])]
    });
  }

  public login(loginData: any): void {
    this.authService.login(loginData).then((loginSuccess: boolean) => {
      if (loginSuccess) {
        this.form.reset();
        this.router.navigate(['/home']);
      }
    });
  }

}
