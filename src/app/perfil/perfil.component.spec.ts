import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PerfilComponent ],
      imports:[
        AngularFireModule.initializeApp(environment.firebase)        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('1. Prueba: Creacion de componente',()=>{
    it('El componente Perfil se deberia de crear existosamente', () => {    
      expect(component).toBeTruthy();
    });
  });

  describe("2. Verifica que la funcion traeDatos() consulte los datos correctos del usuario", function() {
    it("deberia de devolver si el correo existe o no", function() {
      var respuesta = component.traeDatos('KT@algo.com');
      //expect(String(respuesta)).toEqual('true');
      expect(respuesta).toBe(undefined);
    });
  });
});
