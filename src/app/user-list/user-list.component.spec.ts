import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabase, AngularFireList, PathReference, QueryFn } from '@angular/fire/database';
import { environment } from 'src/environments/environment'
import { UserListComponent } from './user-list.component';

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


describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserListComponent],
      imports: [
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
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*1) Se verifica si el componente UserListComponent fue creado*/
  it('El componente UserListComponent ha sido creado', () => {
    expect(component).toBeTruthy();
  });

});