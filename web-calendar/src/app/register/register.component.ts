import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

     private user: User =  new User();

     constructor(private authservice: AuthService, private router: Router, private http: HttpClient) { }

     ngOnInit() {
     }

     register(form){
          console.log(form.value);
          if(form.value.password !== form.value.confirmpassword){
               alert("The password MUST be equals.");
          }else{
               console.log("Registered");
               this.http.post('http://localhost:3000/users/', {
                    email : form.value.newemail,
                    password : form.value.password,
                    name : form.value.name,
                    lastname :  form.value.last
               }).subscribe(
                    (res) => {
                         alert('User created');
                         this.router.navigate(['/']);
                    },

                    (err) => {
                         console.log("Error, try again later");
                    }
               );
          }
     }
}
