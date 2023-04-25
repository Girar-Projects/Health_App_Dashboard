import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhasesListComponent } from './phases-list.component';

describe('PhasesListComponent', () => {
  let component: PhasesListComponent;
  let fixture: ComponentFixture<PhasesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhasesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PhasesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
