import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEncComponent } from './crear-enc.component';

describe('CrearEncComponent', () => {
  let component: CrearEncComponent;
  let fixture: ComponentFixture<CrearEncComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearEncComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearEncComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
