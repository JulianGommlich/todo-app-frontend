import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { TodoListViewComponent } from './todo-list-view/todo-list-view.component';

const routes:Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'forgottenPassword', component: PasswordForgottenComponent },
  { path: 'lists', component: TodoListViewComponent },
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
