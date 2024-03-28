import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-changpassword',
  standalone: true,
  imports: [ReactiveFormsModule,
            CommonModule,
            MatToolbarModule,
            MatFormFieldModule,
            MatButtonModule,
            MatInputModule],
  templateUrl: './changpassword.component.html',
  styleUrls: ['./changpassword.component.scss']

})
export class ChangpasswordComponent implements OnInit {
 
  errorMessage: string = '';
  passwordForm: FormGroup;


  constructor(private http: HttpClient) {
    this.passwordForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.passwordForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      userId: new FormControl('', Validators.required),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
  }

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const newPassword = formGroup.get('newPassword')?.value;
  //   const confirmPassword = formGroup.get('confirmPassword')?.value;
  //   return newPassword === confirmPassword ? null : { mismatch: true };
  // }
  

  changePassword() {
    if (this.passwordForm.invalid) {
      return;
    }

    const body = this.passwordForm.value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('https://facemashbackend.onrender.com/auth/updatePassword', body, { headers })
      .subscribe({
        next: () => {
          console.log('Password changed successfully.');
          this.passwordForm.reset();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error occurred:', error);
          if (error.status === 401) {
            this.errorMessage = 'Old password is incorrect.';
          } else {
            this.errorMessage = 'An error occurred. Please try again later.';
          }
        }
      });
  }
}
