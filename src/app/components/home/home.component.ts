import { Component, OnInit } from '@angular/core';
import { EloService } from '../../services/elo.service';
import { ImageService } from '../../services/image.service';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from '../navigation/navigation.component';
import { error } from 'node:console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    NavigationComponent,
    RouterLink,
    NgIf,
    HttpClientModule,
    NgFor
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  images: any[] = [];
  character1Image: any = '';
  character2Image: any = '';
  originalCharacter1Image: any = '';
  originalCharacter2Image: any = '';

  constructor(private imageService: ImageService, private eloService: EloService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.getAllImages();
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
}