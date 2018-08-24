import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { Event } from '../add-event/event';
import { ParseEvent } from './parse-event';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
     user;
     events;
     parseevent : Array<ParseEvent>;
     month = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

     constructor(private router: Router, private http: HttpClient) {

     }

     ngOnInit() {
          this.parseevent = [];
          this.http.get('http://localhost:3000/ulogged/').subscribe(
               res => {
                    this.user = res[0].email;
                    this.http.get('http://localhost:3000/events/' + this.user).subscribe(
                         res =>{
                              this.events = res;
                              this.events.sort(function(a, b){
                                   if(a.startDate > b.startDate){
                                        return 1;
                                   }

                                   if(a.startDate < b.startDate){
                                        return -1;
                                   }

                                   return 0;
                              });
                              this.parsedate();
                         }
                    );
               }
          );
     }


     getMonth(index){
          var i = Number(index);
          return this.month[i-1];
     }

     parsedate(){

          for(let i=0; i<this.events.length; i++){
               var parse = new ParseEvent();
               parse.id = this.events[i]._id;
               parse.title = this.events[i].title;
               parse.desc = this.events[i].desc;
               parse.local =  this.events[i].local;

               if(this.events[i].startDate.substring(8, 10) === this.events[i].finishDate.substring(8, 10)){
                    parse.dayduration = this.events[i].finishDate.substring(8, 10);
               }else{
                    parse.dayduration =  this.events[i].startDate.substring(8, 10) + "-" + this.events[i].finishDate.substring(8, 10);
               }

               if(this.events[i].startDate.substring(5, 7) === this.events[i].finishDate.substring(5, 7)){
                    parse.monthduration = this.getMonth(this.events[i].finishDate.substring(5, 7));
               }else{
                    parse.monthduration =  this.getMonth(this.events[i].startDate.substring(5, 7)) + " - " + this.getMonth(this.events[i].finishDate.substring(5, 7));
               }

               parse.sh = this.events[i].startDate.substring(11, 16);
               parse.fh = this.events[i].finishDate.substring(11, 16);

               parse.startDate = this.events[i].startDate;
               parse.finishDate = this.events[i].finishDate;
               parse.over = this.events[i].over;

               this.parseevent.push(parse);

          }
     }

     addEvent(){
          this.router.navigate(['/add']);
     }

     logout(){
          this.http.delete('http://localhost:3000/ulogged/1').subscribe(
               res =>{
                    this.router.navigate(['/']);
               },

               err =>{
                    alert("Sorry about that, try again later");
               }
          );

     }
}
