import { CommonModule } from '@angular/common';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-showimg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './showimg.component.html',
  styleUrl: './showimg.component.scss'
})
export class ShowimgComponent implements OnInit {

  imgAll: any = [];
  aid: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.aid = data.aid;
  }

  ngOnInit(): void {
    console.log(this.aid);
    fetch(`https://facemashbackend.onrender.com/img/fetchAllUserImg/${this.aid}`)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data: any) => {
        this.imgAll = data[0];
        console.log(this.imgAll);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

}
