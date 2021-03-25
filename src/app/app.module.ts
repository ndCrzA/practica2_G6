import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ToastrModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {TableModule} from 'primeng/table';


import { NavbarComponent } from './_template/navbar/navbar.component';
import { SidebarComponent } from './_template/sidebar/sidebar.component';
import { FooterComponent } from './_template/footer/footer.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { TablesComponent } from './_pages/tables/tables.component';
import { FormsComponent } from './_pages/forms/forms.component';
import { TypographyComponent } from './_pages/typography/typography.component';
import { MapsComponent } from './_pages/maps/maps.component';
import { NotificationsComponent } from './_pages/notifications/notifications.component';
import { WelcomeComponent } from './_pages/welcome/welcome.component';

import { StreamingComentarioComponent } from './streaming-comentario/streaming-comentario.component';
import { UserListComponent } from './user-list/user-list.component';
import { RegistroComponent } from './_pages/registro/registro.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TablesComponent,
    FormsComponent,
    TypographyComponent,
    MapsComponent,
    NotificationsComponent,
    WelcomeComponent,
    StreamingComentarioComponent,
    UserListComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    CollapseModule.forRoot(),
    ToastrModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule,
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    DividerModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
