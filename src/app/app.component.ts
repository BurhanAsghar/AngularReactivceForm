import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-reactiveform';
  data: any;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getStudents().subscribe((response: any) => {  // Use getStudents() instead of getData()
      this.data = response;
      console.log(this.data);
    }, error => {
      console.error('Error:', error);
    });
  }
}
