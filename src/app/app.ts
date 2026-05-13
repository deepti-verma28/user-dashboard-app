import { Component } from '@angular/core';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserDashboardComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}