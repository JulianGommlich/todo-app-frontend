import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { TodoList } from '../todoList';
import { TodoItem } from '../todoItem';

@Component({
  selector: 'app-todo-item-detail-view',
  templateUrl: './todo-item-detail-view.component.html',
  styleUrls: ['./todo-item-detail-view.component.css']
})
export class TodoItemDetailViewComponent implements OnInit {

  user: User;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  createTodoList() {
    this.user = new User(1, "", "");
    var list = new TodoList(1, "");
    var item = new TodoItem(1, "", "", 1, new Date(), 1, 1);

    this.api.createTodoItem(this.user, list.id, item);
  }

  changeTodoList() {
    this.user = new User(1, "", "");
    var list = new TodoList(1, "");
    var item = new TodoItem(1, "", "", 1, new Date(), 1, 1);

    this.api.changeTodoItem(this.user, list.id, item);
  }

  deleteTodoList(list: TodoList, item: TodoItem) {
    this.user = new User(1, "", "");

    this.api.deleteTodoItem(this.user, list.id, item.id);
  }

}
