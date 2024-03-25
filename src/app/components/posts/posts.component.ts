import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../services/image.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from '../navigation/navigation.component';
import { RouterLink, Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { EloService } from '../../services/elo.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NavigationComponent,
    RouterLink,
    NgIf,
    HttpClientModule
  ],
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  images: any[] = [];
  character1Image: any = '';
  character2Image: any = '';
  originalCharacter1Image: any = '';
  originalCharacter2Image: any = '';
  userId: any;
  avatar_img: any;
  name: any;
  email: any;
  aid: any;

  constructor(private imageService: ImageService,
    private eloService: EloService,
    private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getAllImages();

    this.getUsedetail();

    this.aid = localStorage.getItem('aid');
    this.avatar_img = localStorage.getItem('avatar_img');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  getAllImages() {
    this.imageService.getAllImages().subscribe(
      data => {
        this.images = data;
        this.randomizeImages();
      },
      error => {
        console.error(error);
      }
    );
  }

  // randomizeImages() {
  //   if (this.images.length > 0) {
  //     const data = this.images[0];
  //     const randomIndex1 = Math.floor(Math.random() * data.length);
  //     const randomIndex2 = Math.floor(Math.random() * data.length);
  //     this.character1Image = data[randomIndex1];
  //     this.character2Image = data[randomIndex2];
  //     this.originalCharacter1Image = this.character1Image;
  //     this.originalCharacter2Image = this.character2Image;
  //   }
  // }

  randomizeImages() {
    if (this.images.length > 0) {
      let name1 = '', name2 = '';
      const data = this.images[0];
      let randomIndex1, randomIndex2;
      do {
        randomIndex1 = Math.floor(Math.random() * data.length);
        randomIndex2 = Math.floor(Math.random() * data.length);
        name1 = data[randomIndex1].name;
        name2 = data[randomIndex2].name;
      } while (randomIndex1 === randomIndex2 || name1 === name2);

      this.character1Image = data[randomIndex1];
      this.character2Image = data[randomIndex2];
      this.originalCharacter1Image = this.character1Image;
      this.originalCharacter2Image = this.character2Image;
    }
  }


  onClickC1() {
    const newRating1 = this.eloService.calculateNewRating(this.character1Image.points, this.character2Image.points, true);
    const newRating2 = this.eloService.calculateNewRating(this.character2Image.points, this.character1Image.points, false);
    const id1 = this.character1Image.image_id;
    const id2 = this.character2Image.image_id;

    this.character1Image.points = newRating1;
    this.character2Image.points = newRating2;

    this.imageService.updatePoints(id1, newRating1).subscribe({
      next: (data) => {
        console.log('Character 1 points updated successfully', data);
      },
      error: (error) => {
        console.error('Failed to update Character 1 points:', error);
      }
    });

    this.imageService.updatePoints(id2, newRating2).subscribe({
      next: (data) => {
        console.log('Character 2 points updated successfully', data);
      },
      error: (error) => {
        console.error('Failed to update Character 2 points:', error);
      }
    });

    this.randomizeImages();
  }

  onClickC2() {
    const newRating1 = this.eloService.calculateNewRating(this.character1Image.points, this.character2Image.points, false);
    const newRating2 = this.eloService.calculateNewRating(this.character2Image.points, this.character1Image.points, true);
    const id1 = this.character1Image.image_id;
    const id2 = this.character2Image.image_id;

    this.character1Image.points = newRating1;
    this.character2Image.points = newRating2;

    this.imageService.updatePoints(id1, newRating1).subscribe({
      next: (data) => {
        console.log('Character 1 points updated successfully', data);
      },
      error: (error) => {
        console.error('Failed to update Character 1 points:', error);
      }
    });

    this.imageService.updatePoints(id2, newRating2).subscribe({
      next: (data) => {
        console.log('Character 2 points updated successfully', data);
      },
      error: (error) => {
        console.error('Failed to update Character 2 points:', error);
      }
    });

    this.randomizeImages();
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
      }, (error) => {
        console.error("Error occurred while fetching user details:", error);
      });
  }

}

