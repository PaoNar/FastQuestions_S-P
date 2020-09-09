import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarEncComponent } from './editar-enc.component';

describe('EditarEncComponent', () => {
  let component: EditarEncComponent;
  let fixture: ComponentFixture<EditarEncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarEncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarEncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
