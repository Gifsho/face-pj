import { NgFor, NgIf, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ImageService } from '../../services/image.service';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-addimages',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    NgFor,
    NgIf,
    FormsModule,
    MatCardModule
  ],
  templateUrl: './addimages.component.html',
  styleUrl: './addimages.component.scss'
})
export class AddimagesComponent {
  userId: any;
  avatar_img: any;
  name: any;
  email: any;
  images: any[] = [];
  aid: any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getUsedetail();  

    this.aid = localStorage.getItem('aid');
    this.avatar_img = localStorage.getItem('avatar_img');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  getUsedetail() {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
    });
    this.authService.getUsedetail(this.userId)
      .subscribe((response: any) => {
        this.aid = response?.aid;
        this.avatar_img = response?.avatar_img;
        this.name = response?.name;
        this.email = response?.email;

        localStorage.setItem('aid', this.aid);
            localStorage.setItem('avatar_img', this.avatar_img);
            localStorage.setItem('name', this.name);
            localStorage.setItem('email', this.email);
      }, (error) => {
        console.error("Error occurred while fetching user details:", error);
      });
  }

  // onFileSelected(event: any){
  //   const file: File = event.target.files[0];
  //   if (file) {
  //     this.signupForm.patchValue({
  //       avatar_img: file.name // เซ็ตค่าชื่อไฟล์ให้กับฟิลด์ avatar_img
  //     });
  //   }
  // }
}
