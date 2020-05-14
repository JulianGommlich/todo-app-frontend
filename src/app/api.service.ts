import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user';
import { TodoList } from './todoList';
import { TodoItem } from './todoItem';

const localUrl = "https://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  login(user: any): Observable<any> {
    return this.http.post(localUrl + "/users", user);
  }

  getAllLists(user: any): Observable<any> {
    return this.http.get(localUrl + "/todolists");
  }

  deleteList(user: any, listID: number): Observable<any> {
    return this.http.delete(localUrl + "/todolists/" + listID);
  }

  deleteAllLists(user: any): Observable<any> {
    return this.http.delete(localUrl + "/todolists");
  }

  createTodoList(user: any, list: TodoList): Observable<any> {
    return this.http.post(localUrl + "/todolists", list);
  }

  changeTodoList(user: any, list: TodoList): Observable<any> {
    return this.http.put(localUrl + "/todolists/" + list.id, list);
  }

  getTodoList(user: any, listID: number): Observable<any> {
    return this.http.get(localUrl + "/todolists/" + listID);
  }

  deleteAllTodoItems(user: any, listID: number): Observable<any> {
    return this.http.delete(localUrl + "/todolists/" + listID + "/todoitems");
  }

  deleteTodoItem(user: any, listID: number, itemID: number): Observable<any> {
    return this.http.delete(localUrl + "/todolists/" + listID + "/todoitems/" + itemID);
  }

  createTodoItem(user: any, listID: number, item: TodoItem): Observable<any> {
    return this.http.post(localUrl + "/todolists/" + listID + "/todoitems", item);
  }

  changeTodoItem(user: any, listID: number, item: TodoItem): Observable<any> {
    return this.http.put(localUrl + "/todolists/" + listID + "/todoitems/" + item.id, item);
  }
}
