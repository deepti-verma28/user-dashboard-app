import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserService } from '../../services/user.service';
import { UserForm } from '../../user-form/user-form';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, UserForm],
  templateUrl: './user-dashboard.html',
  styleUrls: ['./user-dashboard.css']
})
export class UserDashboardComponent implements OnInit {

  users: any[] = [];

  showModal = false;

  chart: any;

  constructor(private userService: UserService) {}

  ngOnInit() {

    this.userService.users$.subscribe((data) => {
      this.users = data;
      this.loadChart();
    });

  }

  addUser(user: any) {
    this.userService.addUser(user);
    this.showModal = false;
  }

  async loadChart() {

    const Chart = await import('chart.js/auto');

    const roleCounts = {
      Admin: 0,
      Editor: 0,
      Viewer: 0
    };

    this.users.forEach(user => {
      roleCounts[user.role as keyof typeof roleCounts]++;
    });

    if (this.chart) {
      this.chart.destroy();
    }

    this.chart = new Chart.default('myChart', {
      type: 'pie',
      data: {
        labels: ['Admin', 'Editor', 'Viewer'],
        datasets: [{
          data: [
            roleCounts.Admin,
            roleCounts.Editor,
            roleCounts.Viewer
          ]
        }]
      }
    });

  }
}