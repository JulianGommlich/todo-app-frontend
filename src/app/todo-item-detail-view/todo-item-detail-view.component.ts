import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
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
      this.todoItem = new TodoItem("", "", -1, new Date(), -1, 3);
    } else {
      this.api.getTodoItem(Number(this.listId), Number(this.todoId)).subscribe((data) => {
        this.todoItem = this.mapBackendData(data);
        this.priority = this.todoItem.priority.toString();
        this.state = this.todoItem.state.toString();
      });
    }
  }


  deleteTodoItem() {
    this.api.deleteTodoItem(Number(this.listId), Number(this.todoId));
    this.router.navigateByUrl("/lists/" + this.listId + "/todos");
  }

  onSubmit(f: any) {
    if (this.todoId == "newTodo") {
      var dueDate;
      if (f.dueDate == null) {
        dueDate = '00-00-0000';
      } else {
        dueDate = f.dueDate;
      }
      var todoItem: TodoItem = new TodoItem(f.title, f.description, Number(f.priority), dueDate, Number(f.state), Number(this.listId));
      this.api.createTodoItem(Number(this.listId), todoItem);
    } else {
      var todoItem: TodoItem = new TodoItem(f.title, f.description, f.priority, f.dueDate, f.state, Number(this.listId), Number(this.todoId));
      this.api.changeTodoItem(Number(this.listId), todoItem);
    }
    this.router.navigateByUrl("/lists/" + this.listId + "/todos")
  }

  mapBackendData(backendData: string): TodoItem {
    var backendTodoItem = JSON.parse(JSON.stringify(backendData));
    return new TodoItem(backendTodoItem.itemname, 
        backendTodoItem.itemdescription, Number(backendTodoItem.itempriority), new Date(backendTodoItem.dueDate),
        Number(backendTodoItem.itemstate), backendTodoItem.listnummer, backendTodoItem.id);
  }

}
