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
     private overs: any[];
     private events;

     constructor(private eventservice: EventService, private router: Router, private http: HttpClient) { }

     ngOnInit() {
          console.log(this.events);
          this.http.get('http://localhost:3000/ulogged/').subscribe(
               res => {
                    this.user = res[0].email;
               }
          );
     }

     updateEventsOverlayed(value){
          for(let i in this.overs){
               this.http.put('http://localhost:3000/events/', {
                    id :  this.events[i]._id,
                    title : this.events[i].title,
                    local : this.events[i].local,
                    startDate : this.events[i].startDate,
                    finishDate : this.events[i].finishDate,
                    desc : this.event.desc,
                    over : (this.events[i].over + value)
               }).subscribe(
                    (res) => {
                         console.log("update");
                    },

                    (err) => {
                         console.log("Error, try again later");
                    }
               );
          }
     }

     hasEvent(events, startDate, finishDate){
          this.overs = [];
          var n = 0;
          this.events = events;
          for(let i = 0; i < events.length; i++){
               if((startDate <= events[i].finishDate && startDate >= events[i].startDate) || (finishDate <= events[i].finishDate && finishDate >= events[i].startDate) || (startDate < events[i].startDate && finishDate > events[i].finishDate)){
                    n++;
                    console.log(n);
                    this.overs.push(i);
               }
          }

          return n;
     }

     addEvent(form){
          if(form.value.startDate > form.value.finishDate){
               alert("Events does not travel to the past");
          }else{
               console.log("Added with successs");
               this.http.get('http://localhost:3000/events/' + this.user).subscribe(
                    (res : any) =>{
                         var n = this.hasEvent(res, form.value.startDate, form.value.finishDate);
                         if(n == 0){
                              this.http.post('http://localhost:3000/events/', {
                                   email : this.user,
                                   title : form.value.title,
                                   local : form.value.local,
                                   startDate : form.value.startDate,
                                   finishDate :  form.value.finishDate,
                                   desc : form.value.desc,
                                   over : 0
                              }).subscribe(
                                   (res) => {
                                        alert('Event created');
                                        this.router.navigate(['/calendar']);
                                   },

                                   (err) => {
                                        console.log("Error, try again later");
                                   }
                              );
                         }else{
                              if(confirm("You already have an event on this date, continue?")){
                                   this.http.post('http://localhost:3000/events/', {
                                        email : this.user,
                                        title : form.value.title,
                                        local : form.value.local,
                                        startDate : form.value.startDate,
                                        finishDate :  form.value.finishDate,
                                        desc : form.value.desc,
                                        over : n
                                   }).subscribe(
                                        (res) => {
                                             this.updateEventsOverlayed(1);
                                             alert('Event created');
                                             this.router.navigate(['/calendar']);
                                        },

                                        (err) => {
                                             console.log("Error, try again later");
                                        }
                                   );
                              }
                         }
                    }
               );
          }
     }

     lt(finishDate, startDate){
          if(finishDate.value < startDate.value) return true;
          else return false;
     }

}
