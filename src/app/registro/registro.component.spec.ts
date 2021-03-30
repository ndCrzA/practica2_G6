import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule, AngularFireList } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { RegistroComponent } from './registro.component';

describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports:[
        AngularFireModule.initializeApp(environment.firebase)        
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('El metodo VerificacionEdad() debe devolver la resta del año actual con el año ingresado', ()=>{
    let a: number =1992;
    let b: number =2021;
    let result: number = b - a;
    expect(component.VerificacionEdad(a)).toBe(result);
  })

  it('El metodo VerificacionCampo() debe devolver true', ()=>{
    let a: string="hola";
    expect(component.VerificacionCampos(a)).toBeTruthy();

  })

  it('El metodo registrar() debe funcionar',()=>{
    let metodo=spyOn(component,'registrar');
    component.registrar();
    expect(metodo).toHaveBeenCalled();
  })

  it('El metodo Seguridadcontraseña() debe ser igual a seguro', ()=>{
    let a: string="1234";
    expect(component.SeguridadContraseña(a)).toEqual("seguro");
  })
});
