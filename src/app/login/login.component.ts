import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User(null, "", "");

  constructor(private api: ApiService, private router: Router, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit(loginData) {
    this.user.username = loginData.username;
    this.user.password = loginData.password;


    this.api.login(JSON.stringify(this.user)).subscribe(data => {
      if (typeof(data) == "string") {
        localStorage.setItem("token", data);
        localStorage.setItem("user", this.user.username);
        this.router.navigateByUrl('/lists');
      } else {
        this._snackBar.open("Die Anmeldedaten stimmen nicht", "Ok.", {
          duration: 2000,
        });
      } 
    });
  }
}