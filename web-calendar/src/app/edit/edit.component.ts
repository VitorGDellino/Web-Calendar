import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Event } from '../add-event/event';
import { ParseEvent } from '../calendar/parse-event';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

     event: Event = new Event();
     parseevent: ParseEvent = new ParseEvent();
     id : string;

     constructor(private router: Router, private http: HttpClient) { }

     ngOnInit() {
          this.id = this.router.url.substring(6);
          this.http.get('http://localhost:3000/events/byid' + this.id).subscribe(
               res =>{
                    console.log(res);
               },

               err =>{
                    alert("Sorry about that, try again later");
                    this.router.navigate(['/calendar']);
               }
          );

     }

     lt(finishDate, startDate){
          if(finishDate.value < startDate.value) return true;
          else return false;
     }

     editEvent(form){
          this.router.navigate(['/calendar']);

     }

     deleteEvent(id){
          console.log(id);
          this.http.delete('http://localhost:3000/events/' + id).subscribe(
               res =>{
                    alert("Event cancelled");
                    this.router.navigate(['/calendar']);
               },

               err =>{
                    alert("Sorry about that, try again later");
               }
          );
     }

}
