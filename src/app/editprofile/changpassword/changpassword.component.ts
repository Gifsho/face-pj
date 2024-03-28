import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../services/snackbar.service';

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
  aid: any;


  constructor(private http: HttpClient,
              private snackbarService: SnackbarService) {
    this.passwordForm = this.createFormGroup();
  }

  ngOnInit(): void {
    this.passwordForm = this.createFormGroup();

    this.aid = localStorage.getItem('aid');
    console.log(this.aid);

    if (this.aid !== null) {
      const userIdControl = this.passwordForm.get('userId');
      if (userIdControl !== null) { // Null check
        userIdControl.setValue(this.aid);
      }
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      userId: new FormControl('', Validators.required),
      oldPassword: new FormControl('', Validators.required),
      newPassword: new FormControl('', [Validators.required, Validators.minLength(7)]),
    });
  }


  changePassword() {
    if (this.passwordForm.invalid) {
      return;
    }

    const body = this.passwordForm.value;
    
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put<any>('https://facemashbackend.onrender.com/auth/updatePassword', body, { headers })
      .subscribe({
        next: () => {
          console.log('Password changed successfully.');
          this.snackbarService.openSnackBar('Password changed successfully.', 'success');
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
          this.snackbarService.openSnackBar(this.errorMessage, 'error');
        }
      });
  }
}
