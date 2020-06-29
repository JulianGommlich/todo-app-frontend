import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { PasswordForgottenComponent } from './password-forgotten/password-forgotten.component';
import { TodoListViewComponent } from './todo-list-view/todo-list-view.component';
import { TodoItemDetailViewComponent } from './todo-item-detail-view/todo-item-detail-view.component';
import { TodoItemViewComponent } from './todo-item-view/todo-item-view.component';
import { ErrorComponent } from './error/error.component';

const routes:Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgottenPassword', component: PasswordForgottenComponent },
  { path: 'lists', component: TodoListViewComponent },
  { path: 'lists/:listId/todos', component: TodoItemViewComponent },
  { path: 'lists/:listId/todos/:todoId', component: TodoItemDetailViewComponent },
  { path: '**', component: ErrorComponent},
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
