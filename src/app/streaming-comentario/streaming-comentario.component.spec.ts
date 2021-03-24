import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreamingComentarioComponent } from './streaming-comentario.component';

describe('StreamingComentarioComponent', () => {
  let component: StreamingComentarioComponent;
  let fixture: ComponentFixture<StreamingComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StreamingComentarioComponent ]
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
