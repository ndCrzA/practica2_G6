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

  it('El metodo Seguridadcontraseña() debe ser igual a seguro', ()=>{
    let a: string="1";
    expect(component.SeguridadContraseña(a)).toEqual("inseguro");
  })
   
  it('El metodo verifiacionCampos() debe dispararse antes del metodo registrar()',()=>{
    let metodo=spyOn(component,'registrar');
    let metodo2=spyOn(component,'VerificacionCampos');
    component.VerificacionCampos("123");
    component.registrar();
    expect(metodo2).toHaveBeenCalledBefore(metodo);
  })
  
  it('El metodo CompararContraseña() debe existir', ()=>{
    expect(component.CompararContraseña).toBeDefined();
  })

  it('El metodo CompararContraseña() debe devolver falso', ()=>{
    let a: string="1234";
    let b: string="12345";
    expect(component.CompararContraseña(a,b)).toBeFalsy();
  })

  it('El metodo CompararContraseña() debe devolver true', ()=>{
    let a: string="1234";
    let b: string="1234";
    expect(component.CompararContraseña(a,b)).toBeTruthy();
  })

  it('El metodo VerificacionEdad debe funcionar en el if', ()=>{
    const spy =  spyOn(component, 'VerificacionEdad');
    component.edad=null;    
    component.registrar();     
    expect(spy).toHaveBeenCalled;
  })
  it('El metodo VerificacionCampos debe funcionar en el if', ()=>{
    const spy2 =  spyOn(component, 'VerificacionEdad');
    component.VerificacionCampos=(a: string) => true;    
    component.registrar();     
    expect(spy2).toHaveBeenCalled;
  })
  it('El metodo VerificacionEdad debe funcionar en el if', ()=>{
    const spy2 =  spyOn(component, 'VerificacionEdad');
    component.VerificacionCampos=(a: string) => true; 
    component.VerificacionEdad=(a: number) => 20; 
    component.contrasenaUsuario="123";   
    component.vercontrasena="123";     
    component.registrar();     
    expect(spy2).toHaveBeenCalled;
  })
  it('El metodo VerificacionCampos debe funcionar en el if', ()=>{
    const spy2 =  spyOn(component, 'VerificacionEdad');
    component.VerificacionCampos=(a: string) => true; 
    component.VerificacionEdad=(a: number) => 20; 
    component.contrasenaUsuario="123";   
    component.vercontrasena="1234";     
    component.registrar();     
    expect(spy2).toHaveBeenCalled;
  })
 
});
