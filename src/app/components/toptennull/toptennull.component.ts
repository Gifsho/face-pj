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
  templateUrl: './toptennull.component.html',
  styleUrl: './toptennull.component.scss'
})
export class ToptennullComponent implements OnInit {
  images: any[] = [];
  topTenImages: any[] = [];
  previousTopTenImages: any[] = []; // เพิ่มตัวแปรเก็บข้อมูล Top 10 ของวันก่อนหน้า
  avatar_img: any;
  name: any;
  email: any;
  aid: any;

  constructor(private imageService: ImageService) { }

  async ngOnInit(): Promise<void> {
    if (typeof localStorage !== 'undefined') {
      try {
        this.topTenImages = await this.getTopTenImages();
      } catch (error) {
        console.error(error);
      }
  
      //getlocalStorage
      this.aid = localStorage.getItem('aid');
      this.avatar_img = localStorage.getItem('avatar_img');
      this.name = localStorage.getItem('name');
      this.email = localStorage.getItem('email');
    } else {
      console.warn('localStorage is not available. Skipping initialization.');
    }
  
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

