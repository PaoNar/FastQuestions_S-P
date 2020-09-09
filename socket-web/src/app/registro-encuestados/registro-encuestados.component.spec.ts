import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroEncuestadosComponent } from './registro-encuestados.component';

describe('RegistroEncuestadosComponent', () => {
  let component: RegistroEncuestadosComponent;
  let fixture: ComponentFixture<RegistroEncuestadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroEncuestadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroEncuestadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
