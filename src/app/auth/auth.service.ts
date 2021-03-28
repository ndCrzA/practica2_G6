import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, SnapshotAction } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private db: AngularFireDatabase, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  login(correo: string, password: string) {

    const usuario = this.db.list('/RegistroUsuario',
      ref => ref.orderByChild('email').equalTo(correo)
    ).snapshotChanges();

    usuario
      .subscribe(result =>{
        const usr = result[0];
        if(usr == undefined){
          console.log('Login fallido');
          return;
        }

        const contrasena = usr.payload.val()['contrasena'];
        if((contrasena && contrasena == password) || (!contrasena && password == 'admin')){
          console.log(usr.payload.val()['email']);
          const token = usr.payload.val()['email'];
          this.token = token;
          if (token) {
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            this.saveAuthData(token);
            this.router.navigate(['/']);
            console.log('Login correcto');
          }
        }else{
          this.router.navigate(['/login']);
          console.log('Login Fallido');
        }

      })


  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    console.log(authInformation);
    if (!authInformation) {
      return;
    }
    this.token = authInformation.token;
    this.isAuthenticated = true;
    this.authStatusListener.next(true);
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);

    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private saveAuthData(token: string) {
    localStorage.setItem('token', token);
  }

  private clearAuthData() {
    localStorage.removeItem('token');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
    return {
      token: token
    };
  }
}
