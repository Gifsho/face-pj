import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';



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
  
  ngOnInit(): void {
  }

}
