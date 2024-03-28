import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ImageService } from '../../services/image.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editimages',
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
    MatCardModule,
    MatIconModule
  ],
  templateUrl: './editimages.component.html',
  styleUrl: './editimages.component.scss'
})
export class EditimagesComponent {
  userId: any;
  avatar_img: any;
  name: any;
  email: any;
  images: any[] = [];
  aid: any;
  id : any;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private imageService: ImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.getUsedetail();
      this.getOnlyoneimage();
      this.id = localStorage.getItem('image_id');
      this.aid = localStorage.getItem('aid');
      this.avatar_img = localStorage.getItem('avatar_img');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
    } else {
      console.warn('localStorage is not available. Skipping initialization.');
    }

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

  getOnlyoneimage() {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      this.imageService.getOnlyimage(id).subscribe(
        data => {
          this.images = data[0];
          this.id = data[0]?.images_id; // Corrected line
          localStorage.setItem('image_id', this.id); // Corrected line
        },
        error => {
          console.error(error);
        }
      );
    });
  }
  
  deleteImage() {
    this.route.params.subscribe(params => {
      const id = params['id']; 
      console.log('Deleting image with ID:', id); 
      this.imageService.delete(id).subscribe(
        () => {
          console.log('Image deleted successfully.');
          this.router.navigate(['/main']);
        },
        error => {
          console.error('Error deleting image:', error); 
        }
      );
    });
  }
  
  
}
