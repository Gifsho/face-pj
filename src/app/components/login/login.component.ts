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
import { HttpClientModule } from '@angular/common/http';
import { SnackbarService } from '../../services/snackbar.service';   
import { GlobalConstants } from '../../global/global-constants';
import { Router } from '@angular/router';

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
    MatToolbarModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  responseMessage: any;
  actype: any;

  constructor(private authService: AuthService,
    private router:Router,
    private snackbarService:SnackbarService) {
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
      .subscribe((response:any)=> {
        this.responseMessage = response?.message;
        this.actype = response?.actype;
        console.log(response?.message);
        console.log(response?.actype);
        this.snackbarService.openSnackBar(this.responseMessage,"");
        if (this.responseMessage === "login successfully") {
          if(this.actype == "user"){
            this.router.navigate(["posts"]);
          }else{
            this.router.navigate(["dashboard"]);
          }
        } else {
          this.router.navigate(["login"]);
        }
      },(error) =>{
        if(error.error?.message)
        {
          this.responseMessage = error.error?.message;
        }else{
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage,GlobalConstants.error);
      }
    );
  }

}
