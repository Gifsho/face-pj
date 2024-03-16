import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [MatToolbarModule, RouterModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {

}
