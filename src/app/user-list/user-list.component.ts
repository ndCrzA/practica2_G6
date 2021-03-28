
import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/user'
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  private data: AngularFireList<any>;
  private specificUser: AngularFireList<any>;
  public title: string = "Listado de Usuarios"
  private users: User[] = []
  private userSpecific: User[] = []

  constructor(public db: AngularFireDatabase) {
    this.data = this.db.list('/RegistroUsuario');
    this.specificUser = this.db.list('/RegistroUsuario', ref => ref.orderByChild('nombre').equalTo('Alison'))
  }

  ngOnInit(): void {
    console.log('Obteniendo los usuarios en firebase')
    this.getUsers()
    this.getSpecificUser()
  }

  getUsersData(): User[] {
    return this.users
  }

  getSpecificUser(): boolean {
    this.specificUser.snapshotChanges().subscribe(userList => {
      this.userSpecific = this.llenarLista(userList)
    })
    if (this.userSpecific.length > 0) {
      return true
    }
    return false
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

