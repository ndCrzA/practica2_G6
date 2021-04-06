import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabase, AngularFireList, PathReference, QueryFn } from '@angular/fire/database';
import { environment } from 'src/environments/environment'
import { UserListComponent } from './user-list.component';
import { User } from '../../app/model/user'

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

let userList = [
  {
    payload: {
      val: () => {
        return ({
          id: 1,
          nombre: 'Alison',
          apellido: "Leiva",
          email: 'aleiva24@gmail.com',
          ciudad: 'Guatemala',
          genero: 'Femenino'
        })
      },
      key: 1
    }
  }
]

let users: User[] = [
  {
    id: 1,
    name: 'Alison',
    lastname: "Leiva",
    email: 'aleiva24@gmail.com',
    city: 'Guatemala',
    gender: 'Femenino',
    password: ''
  },
  {
    id: 2,
    name: 'Nicole',
    lastname: "Leiva",
    email: 'nicole@gmail.com',
    city: 'Guatemala',
    gender: 'Femenino',
    password: ''
  },
  {
    id: 3,
    name: 'Alexis',
    lastname: "Arevalo",
    email: 'alex@gmail.com',
    city: 'Guatemala',
    gender: 'Masculino',
    password: ''
  }
]


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

  /*2) Se comprueba que en la tabla se inserten 5 columnas por fila*/
  it('La tabla de usuarios debe tener 5 datos por fila', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    let trs = fixture.nativeElement.querySelectorAll('thead tr th');
    expect(trs).toBeTruthy();
    expect(trs.length).toBe(5);
  })

  /*3) Se verifica si el contenido del titulo es 'Listado de Usuarios' */
  it('El componente tiene el titulo Listado de usuarios', () => {
    const fixture = TestBed.createComponent(UserListComponent);
    const app = fixture.debugElement.componentInstance
    expect(app.title).toEqual('Listado de Usuarios');
  })

  /*4) Se ingresa un valor y se verifica que haya sido ingresado correctamente*/
  it('Verificación de inserción del metodo LlenarLista()', () => {
    //@ts-ignore
    component.llenarLista(userList)
    expect(component.getUsersData()).length == 1;
  })

  /*5) El campo email es un string*/
  it('El campo email es un string', () => {
    //@ts-ignore
    let users = component.llenarLista(userList)
    expect(users.length).toBe(1);
    expect(users.pop().email).toBeInstanceOf(String);
  })

  /*6)Verificacion del valor retornado por los parametros recibidos en el metodo LlenarLista*/
  it('Verificacion de llamada de la funcion LlenarLista', function () {
    let users: User[] = [{
      id: 1,
      name: 'Alison',
      lastname: "Leiva",
      email: 'aleiva24@gmail.com',
      city: 'Guatemala',
      gender: 'Femenino',
      password: ''
    }]
    //@ts-ignore
    const value = component.llenarLista(userList);
    expect(value).toEqual(users)
  })

  /*7) implementacion de posible funcion que retorne los usuarios femeninos*/
  it('implementacion de posible funcion que retorne los usuarios femeninos', function () {
    let femaleUsers: User[] = []

    spyOn(component, 'printUsersFamele').and.callFake(function (AllUsers: User[]): User[] {
      AllUsers.forEach(user => {
        if (user.gender.toLocaleLowerCase() == 'femenino')
          femaleUsers.push(user)
      })
      return femaleUsers;
    });

    var result = component.printUsersFamele(users);
    console.log(result)
    expect(result).toBeTruthy();
  });
});