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
  selector: 'app-chname',
  standalone: true,
  imports: [ReactiveFormsModule,
            CommonModule,
            MatToolbarModule,
            MatFormFieldModule,
            MatButtonModule,
            MatInputModule],
  templateUrl: './chname.component.html',
  styleUrl: './chname.component.scss'
})
export class ChnameComponent implements OnInit {

  errorMessage: string = '';
  nameForm: FormGroup = new FormGroup({}); 
  aid: any;
  name: any;

  constructor(private http: HttpClient,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.nameForm = this.createFormGroup();

    this.aid = localStorage.getItem('aid');
    this.name = localStorage.getItem('name');
    // console.log(this.aid);

    if (this.aid !== null) {
      const userIdControl = this.nameForm.get('userId');
      if (userIdControl !== null) { // Null check
        userIdControl.setValue(this.aid);
      }
    }

    if (this.name !== null) {
      const newNameControl = this.nameForm.get('newName');
      if (newNameControl !== null) { // Null check
        newNameControl.setValue(this.name);
      }
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      userId: new FormControl('', Validators.required),
      newName: new FormControl('', Validators.required),
    });
  }

  changeName() {
    if (this.nameForm.invalid) {
      return;
    }

    const body = this.nameForm.value;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<any>('https://facemashbackend.onrender.com/auth/changeName', body, { headers })
      .subscribe({
        next: () => {
          console.log('Name changed successfully.');
          this.snackbarService.openSnackBar('Name changed successfully.', 'success');
          this.nameForm.reset();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
          this.snackbarService.openSnackBar(this.errorMessage, 'error');
        }
      });
  }

}
