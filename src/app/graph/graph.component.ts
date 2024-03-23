import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { ImageService } from '../services/image.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    MatToolbarModule,
    RouterLink,
    HttpClientModule
  ],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent implements OnInit {
  topTenImages: any[] = [];
  previousTopTenImages: any[] = [];
  avatar_img: any;
  name: any;
  email: any;

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.getGraph();

    //getlocalStorage
    this.avatar_img = localStorage.getItem('avatar_img');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  getGraph(): void {
    this.imageService.getAllImages().subscribe(
      (data: any[]) => {
        const sortedData = data[0].slice().sort((a: any, b: any) => b.points - a.points);
        this.previousTopTenImages = this.topTenImages;
        this.topTenImages = sortedData.slice(0, 10);
        this.createChart();
      },
      error => {
        console.error(error);
      }
    );
  }

  createChart(): void {
    const labels = this.topTenImages.map(image => {
      return image.name.toString() + "(image_id: " + image.image_id.toString() + ")";
    });

    const data = this.topTenImages.map(image => image.points);

    const canvas: HTMLCanvasElement = document.getElementById('myChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Points',
          data: data,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          // tension: 0.1
        }]
      }
    });
  }
}
