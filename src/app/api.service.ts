import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  createStudent(studentData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/users`, studentData);
  }

  getStudents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  updateStudent(id: string, studentData: any): Observable<any> {
    // Adjust this endpoint if your server logic for update differs
    return this.http.put(`${this.baseUrl}/users/${id}`, studentData);
  }

  deleteStudent(id: string): Observable<any> {
    // Adjust this endpoint if your server logic for delete differs
    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
}
