import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireList, PathReference, QueryFn } from '@angular/fire/database';
import { FormsModule, NgForm } from '@angular/forms';
import { environment } from 'src/environments/environment';

import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';
import { not } from '@angular/compiler/src/output/output_ast';
import { AuthService } from '../auth.service';

class AngularFireDatabaseMock {
  list(val: PathReference, queryFn?: QueryFn) {
    let data = {
      snapshotChanges: () => ({
        subscribe: (userList) => {
        }
      })
    }
    return data;
  }
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [
        {
          provide: AngularFireDatabase,
          useClass: AngularFireDatabaseMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

    it('Creacion de componente', () => {
      expect(component).toBeTruthy();
    });

    it('Comprobar que exista un input de tipo email con id correo', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#correo[type="email"]')).toBeTruthy();
    });

    it('Comprobar que exista el campo de password', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#password')).not.toBeNull();
    });

    it('Comprobar que el campo de correo se encuentre vacio', () => {
      const fixture = TestBed.createComponent(LoginComponent);
      fixture.detectChanges();
      const compiled = fixture.nativeElement;
      expect(compiled.querySelector('#correo').textContent).toEqual('');
    });

    it('Comprobar la variable isLoading inicie como falsa', () => {
      const myVar:boolean = component.isLoading;
      expect(myVar).toBeFalsy();
    });

    it('Verificar la validez del formulario en la funcion onLogin', () =>{
      const spy =  spyOn(component, 'onLogin');
      const testForm = <NgForm>{
        invalid: true
      };
      component.onLogin(testForm);
      expect(spy).toHaveBeenCalled;
    });


});
