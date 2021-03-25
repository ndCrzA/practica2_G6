import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/user'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[] = [{ id: 1, name: 'Alison', lastname: 'Leiva', username: 'aleiva98', email: 'alisonleiva24@gmail.com', city: 'Guatemala', gender: 'Femenino' }]

  constructor() { }

  ngOnInit(): void {
  }

}
