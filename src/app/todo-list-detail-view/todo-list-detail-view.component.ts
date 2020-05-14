import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { TodoList } from '../todoList';

@Component({
  selector: 'app-todo-list-detail-view',
  templateUrl: './todo-list-detail-view.component.html',
  styleUrls: ['./todo-list-detail-view.component.css']
})
export class TodoListDetailViewComponent implements OnInit {

  user: User;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  createTodoList() {
    this.user = new User(1, "", "");
    var list = new TodoList(1, "");

    this.api.createTodoList(this.user, list);
  }

  changeTodoList() {
    this.user = new User(1, "", "");
    var list = new TodoList(1, "");

    this.api.changeTodoList(this.user, list);
  }

  deleteTodoList(list: TodoList) {
    this.user = new User(1, "", "");

    this.api.deleteList(this.user, list.id);
  }

}
