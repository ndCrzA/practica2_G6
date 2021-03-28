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

  nombreUsuario: string='';
  apellidoUsuario: string='';
  emailUsuario: string='';
  generoUsuario;
  ciudadUsuario;
  contrasenaUsuario: string='';
  vercontrasena: string='';
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
          ciudad: item.payload.val().ciudad,
          contrasena: item.payload.val().contrasena,
        }
        this.dataUsuario.push(RegistroUsuario);
      })
    })
  }
  VerificacionEdad( a:number ): number{
    return 2021-a;
  }
  VerificacionCampos(a:string): boolean{
    if (a.length>0){
      return true;
    }
    return false;
  }
  CompararContraseña(a:string, b:string): boolean{
    if(a==b){
      return true;
    }
    return false;
  }
  SeguridadContraseña(a:string): string{
    if (a.length>3){
      return "seguro"
    }
    return "inseguro"
  }
  registrar(){
    
    if(this.VerificacionCampos(this.nombreUsuario) && this.VerificacionCampos(this.apellidoUsuario) && this.VerificacionCampos(this.emailUsuario) && this.VerificacionCampos(this.contrasenaUsuario)){
      if (this.VerificacionEdad(this.edad)>17){
        this.edad =this.VerificacionEdad(Number(this.fecha.substring(0,4)));
        if(this.contrasenaUsuario==this.vercontrasena){
          let RegistroUsuario= {
            nombre: this.nombreUsuario,
            apellido: this.apellidoUsuario,
            email: this.emailUsuario,
            genero: this.generoUsuario,
            ciudad: this.ciudadUsuario,
            contrasena: this.contrasenaUsuario
          }    
          this.data.push(RegistroUsuario);
          alert("Usuario Registrado")
        }else{
          alert("Las contraseñas no coinciden");
        }
      }else{
        alert("No puedes crear una cuenta si eres menor de edad")
      }
    }else{
      alert("Hay campos en blanco");
    }
  }
}