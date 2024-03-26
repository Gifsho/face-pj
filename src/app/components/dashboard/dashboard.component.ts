import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  userId: any;
  avatar_img: any;
  name: any;
  email: any;
  aid: any;
  acall: any[] = [];

  constructor(private authService: AuthService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getUsedetail();
    this.getaccount();

    //getlocalStorage
    this.aid = localStorage.getItem('aid');
    this.avatar_img = localStorage.getItem('avatar_img');
    this.name = localStorage.getItem('name');
    this.email = localStorage.getItem('email');
  }

  getUsedetail() {
    this.route.queryParams.subscribe(params => {
      // Get the value of 'email' parameter from the URL
      this.userId = params['userId'];
    });
    this.authService.getUsedetail(this.userId)
      .subscribe((response: any) => {

        this.aid = response?.aid;
        this.avatar_img = response?.avatar_img;
        this.name = response?.name;
        this.email = response?.email;

        // Set values in localStorage
        localStorage.setItem('aid', this.aid);
        localStorage.setItem('avatar_img', this.avatar_img);
        localStorage.setItem('name', this.name);
        localStorage.setItem('email', this.email);

        console.log(response?.aid);
        console.log(response?.avatar_img);
        console.log(response?.name);
        console.log(response?.email);

      }, (error) => {
        console.error("Error occurred while fetching user details:", error);
      }
      );
  }

  async getaccount(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.authService.getaccount().subscribe(
        (data: any[]) => {
          this.acall = data; // เก็บข้อมูลที่ได้รับจาก backend ในตัวแปร acall
          console.log(this.acall);
          resolve(); // แสดงว่าการรับข้อมูลเสร็จสมบูรณ์
        },
        error => {
          console.error(error);
          reject(error);
        }
      );
    });
  }

  


}
