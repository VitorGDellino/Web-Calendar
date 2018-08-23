import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { EventService } from './event.service';
import { Event } from './event';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

     private event: Event = new Event();
     private user;

     constructor(private eventservice: EventService, private router: Router, private http: HttpClient) { }

     ngOnInit() {
          this.http.get('http://localhost:3000/ulogged/').subscribe(
               res => {
                    this.user = res[0].email;
               }
          );
     }

     addEvent(form){
          if(form.value.startDate > form.value.finishDate){
               alert("Events does not travel to the past");
          }else{
               console.log("Added with successs");
               this.http.post('http://localhost:3000/events/', {
                    email : this.user,
                    title : form.value.title,
                    local : form.value.local,
                    startDate : form.value.startDate,
                    finishDate :  form.value.finishDate,
                    desc : form.value.desc
               }).subscribe(
                    (res) => {
                         alert('Event created');
                         this.router.navigate(['/calendar']);
                    },

                    (err) => {
                         console.log("Error, try again later");
                    }
               );
          }
     }

     lt(finishDate, startDate){
          if(finishDate.value < startDate.value) return true;
          else return false;
     }

}
