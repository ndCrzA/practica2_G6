
import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/user'
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  private data: AngularFireList<any>;
  public title: string = "Listado de Usuarios"
  private users: User[] = []

  constructor(public db: AngularFireDatabase) {
    this.data = this.db.list('/RegistroUsuario');
    this.getUsers()
    this.printUsersFamele(this.getUsersData());
  }

  getUsersData(): User[] {
    return this.users
  }

  printUsersFamele(usuarios: User[]) {
    usuarios.forEach(user => {
        console.log(user.name + user.lastname)
    })
  }

  getUsers() {
    this.data.snapshotChanges().subscribe(userList => {
      this.users = this.llenarLista(userList)
    })
  }

  llenarLista(userList: SnapshotAction<any>[]): User[] {
    let usuarios: User[] = []

    userList.forEach(user => {
      usuarios.push({
        id: parseInt(user.payload.key),
        name: user.payload.val().nombre,
        lastname: user.payload.val().apellido,
        email: user.payload.val().email,
        city: user.payload.val().ciudad,
        gender: user.payload.val().genero,
        password: ''
      })
    })

    return usuarios
  }


}

