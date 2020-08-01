import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDocComponent } from './crear-doc.component';

describe('CrearDocComponent', () => {
  let component: CrearDocComponent;
  let fixture: ComponentFixture<CrearDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
