import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SnackbarService } from '../../services/snackbar.service';

@Component({
  selector: 'app-ch-image',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './ch-image.component.html',
  styleUrl: './ch-image.component.scss'
})
export class ChImageComponent {
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
    // this.avatar_img = localStorage.getItem('avatar_img');
    // console.log(this.aid);

    if (this.aid !== null) {
      const userIdControl = this.AvatarForm.get('userId');
      if (userIdControl !== null) { // Null check
        userIdControl.setValue(this.aid);
      }
    }

    // this.selectedImage = this.image_url;
  }

  createFormGroup(): FormGroup {
    return new FormGroup({
      userId: new FormControl('', Validators.required),
      newImg: new FormControl('', Validators.required),
    });
  }

  changeAvatarImg() { 
    if (this.AvatarForm.invalid) {
      return;
    }

    const body = this.AvatarForm.value;
    console.log(body);

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put<any>('https://facemashbackend.onrender.com/img/changeImg', body, { headers }) 
      .subscribe({
        next: () => {
          console.log('Avatar changed successfully.'); 
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
    console.log(reader);

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result;
      console.log(this.selectedImage);

      // if (file !== null) {
      //   const newAvatarImgControl = this.AvatarForm.get('newAvatarImg');
      //   if (newAvatarImgControl !== null) { // Null check
      //     newAvatarImgControl.setValue(this.selectedImage);
      //   }
      // }

    };
    reader.readAsDataURL(file);
  }


}
