import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

     private user: User =  new User();

     constructor(private authservice: AuthService, private router: Router) { }

     ngOnInit() {
     }

     register(form){
          console.log(form.value);
          if(form.value.password !== form.value.confirmpassword){
               alert("The password MUST be equals.");
          }else{
               console.log("Registered");
               this.router.navigate(['/']);

          }
     }
}
