import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AddEventComponent } from './add-event/add-event.component';
import { CalendarComponent } from './calendar/calendar.component';
import { RegisterComponent } from './register/register.component';
import { EditComponent } from './edit/edit.component';

const APP_ROUTES: Routes = [
     { path: '', component: LoginComponent },
     { path: 'calendar', component: CalendarComponent },
     { path: 'edit/:id', component: EditComponent },
     { path: 'signup', component: RegisterComponent },
     { path: 'add', component: AddEventComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);
