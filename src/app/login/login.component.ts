import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  onSubmit(loginData) {
    this.user = new User(1, "", "");

    this.user.username = loginData.username;
    this.user.password = loginData.password;

    this.api.login(this.user);
  }

}
