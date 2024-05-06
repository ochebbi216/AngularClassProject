import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/Services/article.service';
import { EventService } from 'src/Services/event.service';
import { Member1Service } from 'src/Services/member1.service';
import { ChartDataset, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Nb_Articles!: number;
  Nb_Members!: number;
  Nb_Events!: number;
  Nb_Tools: number = 20;
  teacherCount = 0;
  studentCount = 0;

  constructor(private AS: ArticleService, private MS: Member1Service, private ES: EventService) {}

  ngOnInit(): void {
    this.AS.getAll().subscribe((data) => {
      this.Nb_Articles = data.length;
    });
    this.MS.GETALL().subscribe((datas) => {
      this.Nb_Members = datas.length;
      datas.forEach(member => {
        if (member.type.toLowerCase() === 'teacher') {
          this.teacherCount++;
        } else if (member.type.toLowerCase() === 'etudiant') {
          this.studentCount++;
        }
      });
      this.updateChartData();
    });
    this.ES.GET().subscribe((datas) => {
      this.Nb_Events = datas.length;
    });
  }

  chartData: ChartDataset[] = [];
  chartLabels: string[] = ['Teachers', 'Students'];
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      }
    }
  };

  updateChartData(): void {
    this.chartData = [{
      data: [this.teacherCount, this.studentCount],
      backgroundColor: ['#FF6384', '#36A2EB'], // Colors for each section
      hoverBackgroundColor: ['#FF6384', '#36A2EB']
    }];
  }
}
