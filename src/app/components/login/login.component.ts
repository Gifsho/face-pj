import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    MatDividerModule,
    MatToolbarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private authService: AuthService) {
    this.loginForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.loginForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),//ตรวจสอบค่าที่รับมามีรูปแบบของอีเมล์
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7)]),
    })
  }

  login() {
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe();
  }

}
