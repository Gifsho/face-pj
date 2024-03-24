import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ImageService } from '../../services/image.service';
import { NgFor } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from '../navigation/navigation.component';
import { PreviousRankPipe } from '../../previous-rank.pipe';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-topten',
  standalone: true,
  imports: [RouterLink, NgFor, MatToolbarModule, NavigationComponent, PreviousRankPipe ,HttpClientModule
  ],
  templateUrl: './topten.component.html',
  styleUrl: './topten.component.scss'
})
export class ToptenComponent implements OnInit {
  images: any[] = [];
  topTenImages: any[] = [];
  previousTopTenImages: any[] = []; // เพิ่มตัวแปรเก็บข้อมูล Top 10 ของวันก่อนหน้า
  avatar_img: any;
  name: any;
  email: any;
  userId: any;

  constructor(private imageService: ImageService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.topTenImages = await this.getTopTenImages();
    } catch (error) {
      console.error(error);
    }

    //getlocalStorage
    this.userId = localStorage.getItem('userId')
    this.avatar_img = localStorage.getItem('avatar_img');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  async getTopTenImages(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.imageService.getAllImages().subscribe(
        (data: any[]) => {
          const sortedData = data[0].slice().sort((a: any, b: any) => b.points - a.points);
          this.previousTopTenImages = this.topTenImages; // บันทึกข้อมูล Top 10 ของวันก่อนหน้า
          this.topTenImages = sortedData.slice(0, 10);
          resolve(this.topTenImages);
        },
        error => {
          console.error(error);
          reject(error);
        }
      );
    });
  }
}

