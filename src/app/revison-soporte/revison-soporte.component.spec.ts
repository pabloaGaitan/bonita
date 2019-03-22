import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisonSoporteComponent } from './revison-soporte.component';

describe('RevisonSoporteComponent', () => {
  let component: RevisonSoporteComponent;
  let fixture: ComponentFixture<RevisonSoporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisonSoporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisonSoporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
