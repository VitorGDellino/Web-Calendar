import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { User } from './user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

     private user: User =  new User();

     constructor(private authservice: AuthService, private router: Router, private http: HttpClient) { }

     ngOnInit() {
     }

     login(form){
          this.http.post('http://localhost:3000/users/login/', {
               email : form.value.email,
               password : form.value.password,
          }).subscribe(
               (res) => {
                    this.http.post('http://localhost:3000/ulogged/', {
                         id : "1",
                         email : form.value.email
                    }).subscribe(
                         (res) =>{
                              this.router.navigate(['/calendar']);
                         },

                         (err) =>{
                              alert("Error, try again later");
                         }
                    );

               },

               (err) => {
                    alert("Invalid email or password");
                    console.log("Error, try again later");
               }
          );
     }
}
