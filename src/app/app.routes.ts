import { Routes } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AppointmentTemplateComponent } from './components/appointment_templates/AppointmentTemplate.component';
import { RegisterComponent } from './components/register/register.component';
import { ClientComponent } from './components/clients/clients.component';
import { CalendarComponent } from './components/calendar/calendar.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent},
    { path: '',
      component: LayoutComponent,
      canActivate: [AuthGuard],
      //canActivateChild: [AuthGuard],
      children: [
        { path: 'appointments', component: CalendarComponent },
        { path: 'templates', component: AppointmentTemplateComponent },
        { path: 'clients', component: ClientComponent},
      ]
    }
];
