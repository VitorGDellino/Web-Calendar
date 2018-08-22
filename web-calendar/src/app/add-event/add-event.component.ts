import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { EventService } from './event.service';
import { Event } from './event';


@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

     private event: Event = new Event();

     constructor(private eventservice: EventService, private router: Router) { }

     ngOnInit() {
     }

     addEvent(form){
          if(form.value.startDate > form.value.finishDate){
               alert("Events does not travel to the past");
          }else{
               console.log("Added with successs");
               this.router.navigate(['/calendar']);
          }
     }

     lt(finishDate, startDate){
          if(finishDate.value < startDate.value) return true;
          else return false;
     }

}
