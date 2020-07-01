import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../api.service';
import { TodoItem } from '../todoItem';
import { Router, ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-todo-item-view',
  templateUrl: './todo-item-view.component.html',
  styleUrls: ['./todo-item-view.component.css']
})
export class TodoItemViewComponent implements OnInit {

  date: Date = new Date();
  listId: string;
  listTitle: string = localStorage.getItem("listTitle");

  displayedColumns: string[] = ["Name", "Beschreibung", "Status", "Priorität", "Deadline", "Delete"];
  dataSource: MatTableDataSource<TodoItem> = new MatTableDataSource;
  sortedData: TodoItem[];
  todoItemsForFiltering: TodoItem[] = [];

  @ViewChild(MatSort) sort: MatSort;

  constructor(private api: ApiService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    if (localStorage.getItem("token") == "null") { this.router.navigateByUrl("error"); }
    this.activatedRoute.params.subscribe(params => {
      this.listId = params.listId;
      this.api.getTodosOfAList(params.listId).subscribe((data) => {
        this.dataSource = new MatTableDataSource<TodoItem>(this.mapBackendData(data));
        this.todoItemsForFiltering = this.dataSource.data;
      });
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  toTodo(todoItem: TodoItem) {
    localStorage.setItem("todoTitle", todoItem.title);
    this.router.navigateByUrl("lists/" + this.listId + "/todos/" + todoItem.id);
  }

  createTodo(): void {
    this.router.navigateByUrl("lists/" + this.listId + "/todos/newTodo");
  }

  deleteTodoItem(id: number) {
    var todoItems = this.dataSource.data;
    this.dataSource.data.forEach(todoItem => {
      if (todoItem.id == id) {
        todoItems.splice(todoItems.indexOf(todoItem), 1);
        this.dataSource.data = todoItems;
        this.api.deleteTodoItem(Number(this.listId), todoItem.id).subscribe((data) => {
          console.log(data);
        });
      }
    });
  }

  deleteAllTodoItems() {
    this.dataSource.data = [];
    this.api.deleteAllTodoItems(Number(this.listId)).subscribe((data) => {
      console.log(data);
    });
  }

  mapPriority(priorityNumber: number) {
    switch (priorityNumber) {
      case 1:
        return "Sehr hoch";
      case 2:
        return "Hoch";
      case 3:
        return "Mittel";
      case 4:
        return "Niedrig";
      case 5:
        return "Sehr niedrig";
      default:
        return "ERROR";
    }
  }

  mapState(stateNumber: number) {
    switch (stateNumber) {
      case 1:
        return "Offen";
      case 2:
        return "In Arbeit";
      case 3:
        return "Erledigt";
      case 4:
        return "Verspätet erledigt";
      case 5:
        return "Abgebrochen";    
      default:
        return "ERROR";
    }
  }

  mapBackendData(backendData: string): TodoItem[] {
    var frontendData = [] 
    var backendDataJSON = JSON.parse(JSON.stringify(backendData));
    backendDataJSON.forEach(backendTodoItem => {
      var frontendTodoItem = new TodoItem(backendTodoItem.itemname, 
            backendTodoItem.itemdescription, Number(backendTodoItem.itempriority), new Date(backendTodoItem.dueDate),
            Number(backendTodoItem.itemstate), backendTodoItem.listnummer, backendTodoItem.id);
      frontendData.push(frontendTodoItem);
    });

    return frontendData;
  }

  isSortedByNameAsc = false;
  sortByName() {
    var todoItems = this.dataSource.data;
    todoItems.sort((a, b) => {
      if (a.title.toLowerCase() === b.title.toLowerCase()) {
        return 0;
      }
      else {
        if (this.isSortedByNameAsc) { return (a.title.toLowerCase() > b.title.toLowerCase()) ? -1 : 1; }
        if (!this.isSortedByNameAsc) { return (a.title.toLowerCase() < b.title.toLowerCase()) ? -1 : 1; }
      }
    });
    this.dataSource.data = todoItems;
    this.isSortedByNameAsc = !this.isSortedByNameAsc;
  }

  isSortedByStateAsc = false;
  sortByState() {
    var todoItems = this.dataSource.data;
    todoItems.sort((a, b) => {
      if (a.state === b.state) {
        return 0;
      }
      else {
        if (this.isSortedByStateAsc) { return (a.state > b.state) ? -1 : 1; }
        if (!this.isSortedByStateAsc) { return (a.state < b.state) ? -1 : 1; }
      }
    });
    this.dataSource.data = todoItems;
    this.isSortedByStateAsc = !this.isSortedByStateAsc;
  }

  sortByUrgency() {
    var todoItems = this.dataSource.data;
    todoItems.sort((a, b) => {
      if (a.dueDate === b.dueDate) {
        return 0;
      }
      else {
        return (a.dueDate > b.dueDate) ? -1 : 1;
      }
    });
    for (var i = 0; i < todoItems.length - 1; i++) {
      var identicalDates: boolean = false;
      for (var j = i + 1; j < todoItems.length; j++) {
        if (todoItems[i].dueDate == todoItems[j].dueDate) { identicalDates = true; }
        else {
          if (identicalDates) {
            var todoListArrayTmp = todoItems.splice(i,j-i).sort((a, b) => {
              if (a.priority === b.priority) {
                return 0;
              }
              else {
                return (a.priority < b.priority) ? -1 : 1;
              }
            });
            todoItems = todoItems.splice(0,i).concat(todoListArrayTmp, todoItems.splice(i,todoItems.length-i));
            i = j;
          }
          break;
        }
      }
    }
    this.dataSource.data = todoItems;
  }

  applyFilter(event: Event): void {
    console.log(this.todoItemsForFiltering);
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    const filterObject = document.getElementById("filterObject").innerText.trim().toLowerCase();
    var filteredList: TodoItem[] = [];

    switch (filterObject) {
      case "status":
        this.todoItemsForFiltering.forEach(todoItem => {
          var comparisonValue = this.mapState(todoItem.state).toLowerCase();
          if (comparisonValue.indexOf(filterValue) !== -1) {
            filteredList.push(todoItem);
          }
        });
        break;
      case "priorität":
        this.todoItemsForFiltering.forEach(todoItem => {
          var comparisonValue = this.mapPriority(todoItem.priority).toLowerCase();
          if (comparisonValue.indexOf(filterValue) !== -1) {
            filteredList.push(todoItem);
          }
        });
        break;
      case "deadline":
        this.todoItemsForFiltering.forEach(todoItem => {
          if (todoItem.dueDate != null && todoItem.dueDate.toLocaleDateString().toLowerCase().indexOf(filterValue) !== -1) {
            filteredList.push(todoItem);
          }
          if (filterValue == "" && todoItem.dueDate == null) {
            filteredList.push(todoItem);
          }
        });
        break;
    }
    this.dataSource.data = filteredList;
  }
}