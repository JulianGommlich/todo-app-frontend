import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule } from "@angular/forms";
import { TodoListViewComponent } from './todo-list-view/todo-list-view.component';
import { TodoListDetailViewComponent } from './todo-list-detail-view/todo-list-detail-view.component';
import { TodoItemViewComponent } from './todo-item-view/todo-item-view.component';
import { TodoItemDetailViewComponent } from './todo-item-detail-view/todo-item-detail-view.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoListViewComponent,
    TodoListDetailViewComponent,
    TodoItemViewComponent,
    TodoItemDetailViewComponent,
    PasswordForgottenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
