import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  fecha: string='';
  edad: number=0;
  private data: AngularFireList<any>;

  constructor(
    private db: AngularFireDatabase
  ) {
    this.data = this.db.list('/RegistroUsuario');
   }

  nombreUsuario;
  apellidoUsuario;
  emailUsuario;
  generoUsuario;
  ciudadUsuario;

  dataUsuario = [];
  ngOnInit(): void {
    this.data.snapshotChanges().subscribe(d => {
      this.dataUsuario = [];
      d.forEach(item => {
        let RegistroUsuario = {
          id: item.payload.key,
          nombre: item.payload.val().nombre,
          apellido: item.payload.val().apellido,
          email: item.payload.val().email,
          genero: item.payload.val().genero,
          ciudad: item.payload.val().ciudad
        }
        this.dataUsuario.push(RegistroUsuario);
      })
    })
  }
  VerificacionEdad( a:number ): number{
    return 2021-a
  }
  registrar(){
    this.edad =this.VerificacionEdad(Number(this.fecha.substring(0,4)));
    let RegistroUsuario= {
      nombre: this.nombreUsuario,
      apellido: this.apellidoUsuario,
      email: this.emailUsuario,
      genero: this.generoUsuario,
      ciudad: this.ciudadUsuario
    }    
    this.data.push(RegistroUsuario);
  }
}

