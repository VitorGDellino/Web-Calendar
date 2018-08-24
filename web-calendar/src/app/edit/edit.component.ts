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

     private user : string;
     private event: Event = new Event();
     private old: Event = new Event();
     private events: Array<any>;
     private id : string;
     private overs : any[];

     constructor(private router: Router, private http: HttpClient) { }

     ngOnInit() {
          console.log("kamehamehaaaaaaaaaaaaaaa");
          this.http.get('http://localhost:3000/ulogged/').subscribe(
               res => {
                    this.user = res[0].email;
               }
          );

          this.id = this.router.url.substring(6);

          this.http.get('http://localhost:3000/events/byid/' + this.id).subscribe(
               (res : any) =>{
                    this.event.title = res.title;
                    this.event.local = res.local;
                    this.event.desc = res.desc;
                    this.event.startDate = res.startDate;
                    this.event.finishDate = res.finishDate;

                    this.old.startDate = res.startDate;
                    this.old.finishDate = res.finishDate;

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

     hasEvent(events, startDate, finishDate){
          var n = 0;
          this.events = events;
          this.overs = [];
          console.log("OVERS");
          for(let i = 0; i < events.length; i++){
               if((startDate <= events[i].finishDate && startDate >= events[i].startDate) || (finishDate <= events[i].finishDate && finishDate >= events[i].startDate) || (startDate < events[i].startDate && finishDate > events[i].finishDate)){
                    if(events[i]._id !== this.id){
                         n++;
                         this.overs.push(i);
                    }
               }
          }

          console.log(this.overs);

          return n;
     }

     updateEventsOverlayed(value){
          for(let i in this.overs){
               this.http.put('http://localhost:3000/events/', {
                    id :  this.events[i]._id,
                    title : this.events[i].title,
                    local : this.events[i].local,
                    startDate : this.events[i].startDate,
                    finishDate : this.events[i].finishDate,
                    desc : this.events[i].desc,
                    over : (this.events[i].over + value)
               }).subscribe(
                    (res) => {
                         console.log("Event updated", value);
                    },

                    (err) => {
                         alert("Error, try again later");
                    }
               );
          }
     }

     editEvent(form){
          this.http.get('http://localhost:3000/events/' + this.user).subscribe(
               (res : any) => {
                    var n = this.hasEvent(res, this.old.startDate, this.old.finishDate);
                    this.updateEventsOverlayed(-1);
                    n = this.hasEvent(res, form.value.startDate, form.value.finishDate);
                    if(n == 0){
                         this.http.put('http://localhost:3000/events/', {
                              id : this.id,
                              title : form.value.title,
                              local : form.value.local,
                              startDate : form.value.startDate,
                              finishDate : form.value.finishDate,
                              desc : form.value.desc,
                              over : 0
                         }).subscribe(
                              (res) => {
                                   alert("Event updated");
                                   this.router.navigate(['/calendar']);
                              },

                              (err) => {
                                   alert("Error, try again later");
                              }
                         );
                    }else{
                         if(confirm("You already have an event on this date, continue?")){
                              this.http.put('http://localhost:3000/events/', {
                                   id :  this.id,
                                   title : form.value.title,
                                   local : form.value.local,
                                   startDate : form.value.startDate,
                                   finishDate : form.value.finishDate,
                                   desc : form.value.desc,
                                   over : n
                              }).subscribe(
                                   (res) => {
                                        this.updateEventsOverlayed(1);
                                        alert("Event updated");
                                        this.router.navigate(['/calendar']);
                                   },

                                   (err) => {
                                        alert("Error, try again later");
                                   }
                              );
                         }
                    }
               }
          );
     }

     deleteEvent(id){
          if(confirm("Are you sure about cancel this event?")){
               this.http.delete('http://localhost:3000/events/' + id).subscribe(
                    res =>{
                         this.http.get('http://localhost:3000/events/' + this.user).subscribe(
                              (res : any) => {
                                   var n = this.hasEvent(res, this.event.startDate, this.event.finishDate);
                                   this.updateEventsOverlayed(-1);
                                   this.router.navigate(['/calendar']);
                              }
                         );
                    },

                    err =>{
                         alert("Sorry about that, try again later");
                    }
               );
          }
     }

}
