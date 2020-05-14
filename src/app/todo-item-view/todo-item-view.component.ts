import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { TodoItem } from '../todoItem';
import { TodoList } from '../todoList';

@Component({
  selector: 'app-todo-item-view',
  templateUrl: './todo-item-view.component.html',
  styleUrls: ['./todo-item-view.component.css']
})
export class TodoItemViewComponent implements OnInit {

  user: User;
  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  onLoad(list: TodoList) {
    this.api.getTodoList(this.user, list.id);
  }

  deleteTodoItem(list: TodoList, item: TodoItem) {
    this.api.deleteTodoItem(this.user, list.id, item.id);
  }

  deleteAllTodoItems(list: TodoList) {
    this.api.deleteAllTodoItems(this.user, list.id);
  }
}
