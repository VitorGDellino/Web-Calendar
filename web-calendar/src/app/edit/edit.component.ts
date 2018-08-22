import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

     constructor(private router: Router) { }

     ngOnInit() {
     }

     lt(finishDate, startDate){
          if(finishDate.value < startDate.value) return true;
          else return false;
     }

     editEvent(form){
          console.log("Edited successs");
          this.router.navigate(['/calendar']);

     }

}
