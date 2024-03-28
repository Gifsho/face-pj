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
  selector: 'app-ch-avatarimg',
  standalone: true,
  imports: [ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule],
  templateUrl: './ch-avatarimg.component.html',
  styleUrl: './ch-avatarimg.component.scss'
})
export class ChAvatarimgComponent implements OnInit {
  errorMessage: string = '';
  AvatarForm: FormGroup = new FormGroup({});
  aid: any;
  avatar_img: any;
  selectedImage: any;

  constructor(private http: HttpClient,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.AvatarForm = this.createFormGroup();

    this.aid = localStorage.getItem('aid');
    this.avatar_img = localStorage.getItem('avatar_img');
    // console.log(this.aid);

    if (this.aid !== null) {
      const userIdControl = this.AvatarForm.get('userId');
      if (userIdControl !== null) { // Null check
        userIdControl.setValue(this.aid);
      }
    }

    if (this.avatar_img !== null) {
      const newNameControl = this.AvatarForm.get('newAvatarImg');
      if (newNameControl !== null) { // Null check
        newNameControl.setValue(this.avatar_img);
      }
    }
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      userId: new FormControl('', Validators.required),
      newAvatarImg: new FormControl('', Validators.required),
    });
  }

  changeAvatarImg() { 
    if (this.AvatarForm.invalid) {
      return;
    }

    const body = this.AvatarForm.value;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put<any>('https://facemashbackend.onrender.com/auth/changeAvatar', body, { headers }) 
      .subscribe({
        next: () => {
          console.log('Avatar changed successfully.'); // เปลี่ยนข้อความเป็นข้อความที่เหมาะสมสำหรับการเปลี่ยนรูปภาพ avatar
          this.snackbarService.openSnackBar('Avatar changed successfully.', 'success');
          this.AvatarForm.reset();
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error occurred:', error);
          this.errorMessage = 'An error occurred. Please try again later.';
          this.snackbarService.openSnackBar(this.errorMessage, 'error');
        }
      });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
    };
    reader.readAsDataURL(file);
  }


}
