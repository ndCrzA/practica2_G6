import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { FormsComponent } from './_pages/forms/forms.component';
import { MapsComponent } from './_pages/maps/maps.component';
import { NotificationsComponent } from './_pages/notifications/notifications.component';
import { TablesComponent } from './_pages/tables/tables.component';
import { TypographyComponent } from './_pages/typography/typography.component';


import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';
import { StreamingComentarioComponent } from './streaming-comentario/streaming-comentario.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegistroComponent } from './registro/registro.component';
import { PerfilComponent } from './perfil/perfil.component';

const routes: Routes = [
  {path: '', component:  DashboardComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'forms', component: FormsComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent},


  {path: 'login', component:  LoginComponent},
  {path: 'comentarios', component: StreamingComentarioComponent, canActivate: [AuthGuard]},
  {path: 'userlist', component: UserListComponent, canActivate: [AuthGuard]},
  {path: 'registro', component: RegistroComponent},
  {path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
