import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { User } from '../user';
import { TodoList } from '../todoList';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todo-list-view',
  templateUrl: './todo-list-view.component.html',
  styleUrls: ['./todo-list-view.component.css']
})
export class TodoListViewComponent implements OnInit {

  user: User;

  username: String = localStorage.getItem("user");

  todoLists: TodoList[] = [ ]

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("token") == "null") { this.router.navigateByUrl("error"); }
    this.api.getAllLists().subscribe(data => {
      this.todoLists = data;
    });
  }

  toTasks(todoList: TodoList) {
    localStorage.setItem("listTitle", todoList.name)
    this.router.navigateByUrl("/lists/" + todoList.id + "/todos");
  }

  makeTitleEditable(id: number) {
    var title = document.getElementById("t" + id.toString());
    var field = document.getElementById("f" + id.toString());

    title.setAttribute("style", "display: none;");
    field.setAttribute("style", "display: block;");
  }

  editTitle(id: number) {
    this.todoLists.forEach(todoList => {
      if (todoList.id == id) {
        todoList.name = (<HTMLInputElement>document.getElementById("input_" + id)).value;
        this.api.changeTodoList(todoList).subscribe((data) => {
          console.log(data);
        });
      }
    });

    var title = document.getElementById("t" + id.toString());
    var field = document.getElementById("f" + id.toString());

    field.setAttribute("style", "display: none;");
    title.setAttribute("style", "display: block;");
  }

  createList() {
    this.api.createTodoList(new TodoList("Neue Liste")).subscribe(() => {
      window.location.reload();
    });
  }

  deleteList(id: number) {
      this.todoLists.forEach(todoList => {
        if (todoList.id == id) {
          this.todoLists.splice(this.todoLists.indexOf(todoList),1);
          this.api.deleteList(id).subscribe((data) => {
            console.log(data);
          });
        }
      });
  }

  deleteAllLists() {
    this.todoLists = [];

    this.api.deleteAllLists().subscribe((data) => {
      console.log(data);
    });
  }

}
