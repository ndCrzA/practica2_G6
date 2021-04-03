import { Component, OnInit } from '@angular/core';
import { User } from '../../app/model/user';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  private data: AngularFireList<any>;
  usuarioprueba : User = { id: 2, name: 'Jeackelin', lastname: 'Montenegro',  email: 'jsmontenegro0305@gmail.com', city: 'Guatemala', gender: 'Femenino', password: '123' };
  users: User[] = []
  titulo = "PERFIL";
  correo = "";

  constructor(private db: AngularFireDatabase, private auth1 : AuthService) {
   
  }
  ngOnInit(): void {
    //this.correo = this.auth1.getToken();
    //this.traeDatos(correo);
    this.traeDatos('KM@algo.com');
    }

  traeDatos(correo: string) {
    const usuario = this.db.list('/RegistroUsuario',  ref => ref.orderByChild('email').equalTo(correo) );

    usuario.snapshotChanges().subscribe(result =>{
      const usr = result[0];
        this.users.push({
          id:  parseInt(usr.payload.key),
          name: usr.payload.val()['nombre'],
          lastname: usr.payload.val()['apellido'],
          email: usr.payload.val()['email'],
          city: usr.payload.val()['ciudad'],
          gender: usr.payload.val()['genero'],
          password: ''
        })
        //return 'true';
    })
  }

}

