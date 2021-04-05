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


});
