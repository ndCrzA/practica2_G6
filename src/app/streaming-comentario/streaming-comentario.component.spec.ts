import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

import { StreamingComentarioComponent } from './streaming-comentario.component';

describe('StreamingComentarioComponent', () => {
  let component: StreamingComentarioComponent;
  let fixture: ComponentFixture<StreamingComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingComentarioComponent ],
      imports:[
        AngularFireModule.initializeApp(environment.firebase)        
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





});
