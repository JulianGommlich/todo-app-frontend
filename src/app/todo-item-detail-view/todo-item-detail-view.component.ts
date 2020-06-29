import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { TodoList } from '../todoList';
import { TodoItem } from '../todoItem';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-item-detail-view',
  templateUrl: './todo-item-detail-view.component.html',
  styleUrls: ['./todo-item-detail-view.component.css']
})
export class TodoItemDetailViewComponent implements OnInit {

  priority: string;
  state: string;
  user: User;
  todoItem: TodoItem;
  listTitle: string = localStorage.getItem("listTitle");
  listId: string = window.location.href.split("/")[4];
  todoId: string = window.location.href.split("/")[6];
  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == "null") { this.router.navigateByUrl("error"); }
    if (window.location.href.indexOf("newTodo") > -1) {
      this.todoItem = new TodoItem(-1, "", "", -1, new Date(), -1, 3);
      this.priority = this.todoItem.priority.toString();
      this.state = this.todoItem.state.toString();
    } else {
      this.api.getTodoItem(Number(this.listId), Number(this.todoId)).subscribe((data) => {
        console.log(data);
        this.todoItem = data;
        this.priority = this.todoItem.priority.toString();
        this.state = this.todoItem.state.toString();
      });
    }
  }


  deleteTodoItem() {
    this.api.deleteTodoItem(Number(this.listId), Number(this.todoId)).subscribe((data) => {
      console.log(data);
    });
  }

  onSubmit(f: any) {
    if (this.todoId == "newTodo") { this.todoId = "-1"}
    var todoItem: TodoItem = new TodoItem(Number(this.todoId), f.string, f.description, f.priority, f.dueDate, f.state, Number(this.listId));

    this.api.changeTodoItem(Number(this.listId), todoItem).subscribe((data) => {
      console.log(data);
    });
  }

}
