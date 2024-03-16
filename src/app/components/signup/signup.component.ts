import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';


@Component({
  selector: 'app-signup',

  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    RouterLink,
    MatToolbarModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  router: any;

  constructor(private authService: AuthService) {
    this.signupForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      avatar_img: new FormControl("", [Validators.required, Validators.minLength(2)]),//ต้องมีความยาวอย่างน้อย 2 ตัวอักษร
      name: new FormControl("", [Validators.required, Validators.minLength(2)]),
      email: new FormControl("", [Validators.required, Validators.email]),//ตรวจสอบค่าที่รับมามีรูปแบบของอีเมล์
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7)]),
    })
  }

  singup(): void {
    this.authService
      .signup(this.signupForm.value)
      .subscribe((msg) => console.log(msg));
  }


  onFileSelected(event: any){
    const file: File = event.target.files[0];
    if (file) {
      this.signupForm.patchValue({
        avatar_img: file.name // เซ็ตค่าชื่อไฟล์ให้กับฟิลด์ avatar_img
      });
    }
  }
  
  


}
