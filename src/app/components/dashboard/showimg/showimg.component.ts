import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-showimg',
  standalone: true,
  imports: [],
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
        // Store data in imgAll variable
        this.imgAll = data;
        console.log(this.imgAll); // Log the data stored in imgAll
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

}
