import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertcursosComponent } from './insertcursos.component';

describe('InsertcursosComponent', () => {
  let component: InsertcursosComponent;
  let fixture: ComponentFixture<InsertcursosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InsertcursosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsertcursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
