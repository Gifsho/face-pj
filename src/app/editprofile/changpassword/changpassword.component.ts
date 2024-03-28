import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-changpassword',
  standalone: true,
  imports: [],
  templateUrl: './changpassword.component.html',
  styleUrls: ['./changpassword.component.scss']

})
export class ChangpasswordComponent {
  passwordForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', Validators.required)
  });
  

  errorMessage: string = '';


  constructor(private http: HttpClient) {}

  passwordMatchValidator(formGroup: FormGroup) {
    const newPassword = formGroup.get('newPassword')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { mismatch: true };
  }
  

  changePassword() {
    if (this.passwordForm.invalid) {
      return;
    }

    const body = this.passwordForm.value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('http://your-backend-api-url/updatePassword', body, { headers })
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
