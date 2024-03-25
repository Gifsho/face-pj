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
    private imageService: ImageService,
    @Inject(PLATFORM_ID) private platformId: any
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.userId = params['userId'];
      if (this.userId) {
        this.getUsedetail();
      }
    });

    if (isPlatformBrowser(this.platformId)) {
      this.aid = localStorage.getItem('aid');
      this.avatar_img = localStorage.getItem('avatar_img');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
      console.log(this.name);
      console.log(this.aid);
    }
  }

  getUsedetail() {
    this.authService.getUsedetail(this.userId).subscribe(
      (response: any) => {
        if (response) {
          this.aid = response?.aid;
          this.avatar_img = response?.avatar_img;
          this.name = response?.name;
          this.email = response?.email;

          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('aid', this.aid);
            localStorage.setItem('avatar_img', this.avatar_img);
            localStorage.setItem('name', this.name);
            localStorage.setItem('email', this.email);
          }
        }
      },
      (error) => {
        console.error("Error occurred while fetching user details:", error);
      }
    );
  }
}
