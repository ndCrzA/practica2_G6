import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { FormsComponent } from './_pages/forms/forms.component';
import { MapsComponent } from './_pages/maps/maps.component';
import { NotificationsComponent } from './_pages/notifications/notifications.component';
import { TablesComponent } from './_pages/tables/tables.component';
import { TypographyComponent } from './_pages/typography/typography.component';


import { StreamingComentarioComponent } from './streaming-comentario/streaming-comentario.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegistroComponent } from './_pages/registro/registro.component';
import { PerfilComponent } from './_pages/perfil/perfil.component';

const routes: Routes = [
  {path: '',   redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'forms', component: FormsComponent},
  {path: 'tables', component: TablesComponent},
  {path: 'typography', component: TypographyComponent},
  {path: 'maps', component: MapsComponent},
  {path: 'notifications', component: NotificationsComponent},

  
  {path: 'comentarios', component: StreamingComentarioComponent},
  {path: 'userlist', component: UserListComponent},
  {path: 'registro', component: RegistroComponent},
  {path: 'perfil', component: PerfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
