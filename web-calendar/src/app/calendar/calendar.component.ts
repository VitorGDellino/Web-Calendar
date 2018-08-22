import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Event } from '../add-event/event';
import { ParseEvent } from './parse-event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {

     events = new Array();
     parseevent = new Array();
     month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

     constructor(private router: Router) {
          this.init();
          this.parsedate();
     }

     ngOnInit() {
     }

     init(){
          event = new Event();
          event.title = "Aula";
          event.local = "ICMC";
          event.startDate = "2018-08-08T10:00";
          event.finishDate = "2018-08-09T11:00 ";
          event.desc = "Aula de POO";
          this.events.push(event);
     }

     getMonth(index){
          var i = Number(index);
          return this.month[i-1];

     }

     parsedate(){

          event = new ParseEvent();
          for(let i=0; i<this.events.length; i++){
               event.title = this.events[i].title;
               event.desc = this.events[i].title;
               event.local =  this.events[i].local;


               if(this.events[i].startDate.substring(8, 10) === this.events[i].finishDate.substring(8, 10)){
                    event.dayduration = this.events[i].finishDate.substring(8, 10);
               }else{
                    event.dayduration =  this.events[i].startDate.substring(8, 10) + "-" + this.events[i].finishDate.substring(8, 10);
               }

               if(this.events[i].startDate.substring(5, 7) === this.events[i].finishDate.substring(5, 7)){
                    event.monthduration = this.getMonth(this.events[i].finishDate.substring(5, 7));
               }else{
                    event.monthduration =  this.getMonth(this.events[i].startDate.substring(5, 7)) + " " + this.getMonth(this.events[i].finishDate.substring(5, 7));
               }

               event.sh = this.events[i].startDate.substring(11, 16);
               event.fh = this.events[i].finishDate.substring(11, 16);

               event.startDate = this.events[i].startDate;
               event.finishDate = this.events[i].finishDate;

               this.parseevent.push(event);

          }
     }

     getEvents(){
          return this.parseevent;
     }

     addEvent(){
          this.router.navigate(['/add']);
     }

     deleteEvent(){
          console.log("foi");
     }

     logout(){
          this.router.navigate(['/']);
     }



}
