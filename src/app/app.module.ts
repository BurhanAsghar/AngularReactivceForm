import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms'; // Import FormBuilder
import { AppComponent } from './app.component';
import { StudentFormComponent } from './component/student-form/student-form.component';
import { ApiService } from './api.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
   
  ],
  providers: [ ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
