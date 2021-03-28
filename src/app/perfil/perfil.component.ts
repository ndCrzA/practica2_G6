import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  private data: AngularFireList<any>;
  users: User[] = []
  


  constructor(private db: AngularFireDatabase) {
    this.data = db.list('/RegistroUsuario', ref => ref.orderByChild('email').equalTo('KT@algo.com'))
    //console.log(this.data)
  }

  ngOnInit(): void {
    this.data.snapshotChanges().subscribe(d => {
      d.forEach(item => {
        this.users.push({
          id:  parseInt(item.payload.key),
          name: item.payload.val().nombre,
          lastname: item.payload.val().apellido,
          email: item.payload.val().email,
          city: item.payload.val().ciudad,
          gender: item.payload.val().genero,
          password: ''
        })

      })
    })

  }

}

