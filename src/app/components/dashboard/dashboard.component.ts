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
  imports: [  MatToolbarModule,
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

  constructor(private authService: AuthService,
              private route: ActivatedRoute) {}

  
  ngOnInit(): void {
    this.getUsedetail();
  }

  getUsedetail() {
    this.route.queryParams.subscribe(params => {
      // Get the value of 'email' parameter from the URL
      this.userId = params['userId'];
    });
    this.authService.getUsedetail(this.userId)
      .subscribe((response: any) => {

        this.avatar_img = response?.avatar_img;
        this.name = response?.name;
        this.email = response?.email;
        console.log(response?.avatar_img);
        console.log(response?.name);
        console.log(response?.email);

      }, (error) => {
        console.error("Error occurred while fetching user details:", error);
      }
      );
  }

}
