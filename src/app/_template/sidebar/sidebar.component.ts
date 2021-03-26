import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  menus = [
    {name : 'Dashboard', route: '/dashboard', icon: 'fa fa-tv', badge: 'NEW', visible: false},
    {name : 'Forms', route: '/forms', icon: 'fas fa-gem', badge: '', visible: false},
    {name : 'Tables', route: '/tables', icon: 'fa fa-table', badge: '', visible: false},
    {name : 'Typography', route: '/typography', icon: 'fa fa-align-center', badge: '', visible: false},
    {name : 'Maps', route: '/maps', icon: 'fa fa-globe', badge: '', visible: false},
    {name : 'Notifications', route: '/notifications', icon: 'fas fa-bell', badge: '', visible: false},
    
    {name : 'Comentarios', route: '/comentarios', icon: 'fas fa-comments', badge: '', visible: true},
    {name : 'Listado de Usuarios', route: '/userlist', icon: 'fas fa-users', badge: '', visible: true},
    {name : 'Registro de Usuarios', route: '/registro', icon: 'fas fa-users', badge: '', visible: true},
    {name : 'perfil', route: '/perfil', icon: 'fas fa-users', badge: '', visible: true}
  ];

  constructor() { }

  ngOnInit() {
  }

}
