import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, PathReference, QueryFn } from '@angular/fire/database';
import { Observable, observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { StreamingComentarioComponent } from './streaming-comentario.component';

class AngularFireDatabaseMock {
  list(val: PathReference, queryFn?: QueryFn) {
    let data = {
      snapshotChanges: () => ({
        subscribe: (ref) => {
        }
      })
    }
    return data;
  }
}

let comentarios = [
  {
    payload: {
      val: () => {
        return ({
          comentario : 'comentario prueba',
          fecha :  new Date().toLocaleString()
        })
      },
      key: 1
    }
  }
]

let streamings = [
  {
    payload: {
      val: () => {
        return ({
          nombre: 'fake1',
          descripcion: 'descripcion fake1',
          observaciones: 'observaciones fake1'
        })
      },
      key: 1
    }
  }
]

describe('StreamingComentarioComponent', () => {
  let component: StreamingComentarioComponent;
  let fixture: ComponentFixture<StreamingComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingComentarioComponent ],
      imports:[
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
    fixture = TestBed.createComponent(StreamingComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
  //1)
  it('inicialmente debe tener un tamañao de 0', () => {
    expect(component.dataStreaming).toHaveSize(0);
  });
  
  //2)
  it('DEBE DE EXISTIR UNA FUNCION QUE OBTIENE LOS STREAMING', () => {
    let metodo = spyOn(component,'getDataStreaming');
    component.getDataStreaming();
    expect(metodo).toHaveBeenCalled();
  });  

  //3)
  it('SETEAR INFORMACION DE STREAMING', () => {
    let s = component.setDataStreaming(streamings);
    expect(s.length > 1).toBeFalsy();
  })

  //4)
  it('SETEAR INFORMACION DE COMENTARIOS', () => {
    let c = component.setDataComentario(comentarios);
    expect(c.length == 1).toBeTruthy();
  })

  //5)
  it('llamada al metodo obtener comentarios', () => {
    component.getDataComentario('idFake');
    expect(component.dataComentario.length == 0).toEqual(true);
  });

  //6)
  it('evento del ratio button para cargar comentarios', () => {           
    component.onClickStreaming(null,'idFake');
    let c = component.setDataComentario(comentarios);
    expect(c.length).toBeLessThan(2);
  });

  //7)
  it('definir variables nulas', () => {           
    expect(component.nombreStreaming).toBeNull();
    expect(component.descripcionStreaming).toBeNull();
    expect(component.observacionesStreaming).toBeNull();
  });

});
