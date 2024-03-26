import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink, Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SnackbarService } from '../../services/snackbar.service';   
import { GlobalConstants } from '../../global/global-constants';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';


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
    MatToolbarModule,
    NavigationComponent,
    CommonModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  responseMessage: any;
  selectedImage: string | ArrayBuffer | null = null; // Property to hold selected image URL


  constructor(private authService: AuthService,
              private router:Router,
              private snackbarService:SnackbarService) {
    this.signupForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.signupForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      avatar_img: new FormControl("", [Validators.required]),
      name: new FormControl("", [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]),
      email: new FormControl("", [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]),//ตรวจสอบค่าที่รับมามีรูปแบบของอีเมล์
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(7)]),
    })
  }

  singup(): void {
    this.authService
      .signup(this.signupForm.value)
      .subscribe((response:any)=> {
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage,"");
        this.router.navigate(['/login']);
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

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      // Set selected image URL for preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.selectedImage = e.target.result;
        }
      };
      reader.readAsDataURL(file);
  
      this.signupForm.patchValue({
        avatar_img: file.name // Set file name to the avatar_img field
      });
    }
  }
  
  
  


}