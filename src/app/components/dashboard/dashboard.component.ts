import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NgFor } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ShowimgComponent } from './showimg/showimg.component'; 



@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    RouterLink,
    NgFor
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
  dialog: any;

  constructor(private authService: AuthService,
    private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.getUsedetail();
    this.fetchAccounts();

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

        // console.log(response?.aid);
        // console.log(response?.avatar_img);
        // console.log(response?.name);
        // console.log(response?.email);

      }, (error) => {
        console.error("Error occurred while fetching user details:", error);
      }
      );
  }

  async fetchAccounts(): Promise<void> {
    try {
        this.acall = await this.getaccount();
    } catch (error) {
        console.error(error);
    }
}

async getaccount(): Promise<any[]> {
  try {
    const data: any | undefined = await this.authService.getaccount().toPromise();
    if (data !== undefined) {
      this.acall = data[0];
      console.log(this.acall);
      return data;
    } else {
      throw new Error("Data is undefined"); // โยน error ถ้า data เป็น undefined
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}


showimg() {
  const dialogConfig = new MatDialogConfig();
  dialogConfig.width = "1000px";
  dialogConfig.width = "1000px";
  this.dialog.open(ShowimgComponent,dialogConfig);
}


  


}
