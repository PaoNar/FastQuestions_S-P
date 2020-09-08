import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncuestadoComponent } from './encuestado.component';

describe('EncuestadoComponent', () => {
  let component: EncuestadoComponent;
  let fixture: ComponentFixture<EncuestadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncuestadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncuestadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
