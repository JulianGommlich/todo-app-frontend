import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { TodoList } from '../todoList';

@Component({
  selector: 'app-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.css']
})
export class TodoListViewComponent implements OnInit {

  user: User;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  onLoad() {
    this.user = new User(1, "", "");

    this.api.getAllLists(this.user);
  }

  deleteList(list: TodoList) {
    this.user = new User(1, "", "");

    this.api.deleteList(this.user, list.id);
  }

  deleteAllLists() {
    this.user = new User(1, "", "");

    this.api.deleteAllLists(this.user);
  }

}
