import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showimg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showimg.component.html',
  styleUrl: './showimg.component.scss'
})
export class ShowimgComponent implements OnInit {

  imgAll: any = [];
  aid:any; 


  ngOnInit(): void {
    this.aid = localStorage.getItem('aid');

    fetch(`https://facemashbackend.onrender.com/img/fetchAllUserImg/${this.aid}`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any) => {
        this.imgAll = data[1];
        console.log(this.imgAll); 
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

}
