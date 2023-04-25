import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectUsersListComponent } from './select-users-list.component';

describe('SelectUsersListComponent', () => {
  let component: SelectUsersListComponent;
  let fixture: ComponentFixture<SelectUsersListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectUsersListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
