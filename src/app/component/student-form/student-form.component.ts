import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../api.service';

export function MustMatch(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  studentForm!: FormGroup;
  submitted = false;
  students: any[] = [];
  selectedStudent: any = null;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-Z]+$')]],
      fullName: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.pattern('^[0-9]+$'), Validators.min(18)]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      dateTime: ['', [Validators.required, Validators.pattern('^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$')]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).+$')]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });

    this.fetchStudents(); // Call fetchStudents method
  }

  fetchStudents(): void {
    this.apiService.getStudents().subscribe(response => {
      this.students = response;
    }, error => {
      console.error('Error fetching students:', error);
    });
  }

  get f() { return this.studentForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    this.apiService.createStudent(this.studentForm.value).subscribe(response => {
      console.log('User created successfully:', response);
      this.fetchStudents(); // Refresh the student list
      this.studentForm.reset();
      this.submitted = false;
    }, error => {
      console.error('Error creating user:', error);
    });
  }

  selectStudent(student: any): void {
    this.selectedStudent = student;
  }

  updateStudent(): void {
    if (!this.selectedStudent) {
      return;
    }

    this.apiService.updateStudent(this.selectedStudent.id, this.selectedStudent).subscribe(response => {
      console.log('Student updated successfully:', response);
      this.fetchStudents(); // Refresh the student list
    }, error => {
      console.error('Error updating student:', error);
    });
  }

  deleteStudent(): void {
    if (!this.selectedStudent) {
      return;
    }

    this.apiService.deleteStudent(this.selectedStudent.id).subscribe(() => {
      console.log('Student deleted successfully');
      this.fetchStudents(); // Refresh the student list
      this.selectedStudent = null;
    }, error => {
      console.error('Error deleting student:', error);
    });
  }
}
