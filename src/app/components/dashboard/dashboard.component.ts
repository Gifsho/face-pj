import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationComponent } from '../navigation/navigation.component';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [  MatToolbarModule,
              MatButtonModule,
              MatInputModule,
              MatFormFieldModule,
              NavigationComponent,
              RouterLink,
              NgIf,
              HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  constructor(private authService: AuthService,
    private router:Router,) {}

  ngOnInit(): void {
  }

}
