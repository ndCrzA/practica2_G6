import { Component, OnInit } from '@angular/core';
import { User } from '../../../app/model/user';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario : User = { id: 2, name: 'Jeackelin', lastname: 'Montenegro', username: 'jackymontenegro', email: 'jsmontenegro0305@gmail.com', city: 'Guatemala', gender: 'Femenino' };

  constructor() { }

  ngOnInit(): void {
  }

}
