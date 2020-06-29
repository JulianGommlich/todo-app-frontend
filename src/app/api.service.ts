import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { TodoList } from './todoList';
import { TodoItem } from './todoItem';
import { catchError } from 'rxjs/operators';

const localUrl = "/todo-app-backend/public/api";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  config = {
    headers: {
      "Access-Control-Allow-Origin": "*",
    }
  }

  constructor(private http: HttpClient) { }

  errorHandler(error: HttpErrorResponse) {
    return of([]);//throwError(error.message || "Server Error.");
  }

  login(user: any): Observable<any> {
    return this.http.post("/todo-app-backend/public/api/users", user)
      .pipe(catchError(this.errorHandler));
  }

  getAllLists(): Observable<any> {
    return this.http.get("/todo-app-backend/public/api/lists", {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }

  deleteList(listID: number): Observable<any> {
    return this.http.delete(localUrl + "/lists/" + listID, {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }

  deleteAllLists(): Observable<any> {
    return this.http.delete(localUrl + "/lists", {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }

  changeTodoList(list: TodoList): Observable<any> {
    return this.http.put(localUrl + "/lists/" + list.id, list, {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }

  getTodosOfAList(listID: number): Observable<any> {
    return this.http.get(localUrl + "/lists/" + listID + "/tasks", {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }

  deleteAllTodoItems(listID: number): Observable<any> {
    return this.http.delete(localUrl + "/lists/" + listID + "/tasks", {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }

  getTodoItem(listID: number, itemID: number): Observable<any> {
    return this.http.get(localUrl + "/lists/" + listID + "/tasks/" + itemID, {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }

  deleteTodoItem(listID: number, itemID: number): Observable<any> {
    return this.http.delete(localUrl + "/lists/" + listID + "/tasks/" + itemID, {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }

  changeTodoItem(listID: number, item: TodoItem): Observable<any> {
    return this.http.put(localUrl + "/lists/" + listID + "/tasks/" + item.id, item, {
      headers: {
        "token": localStorage.getItem("token")
      }
    });
  }
}
