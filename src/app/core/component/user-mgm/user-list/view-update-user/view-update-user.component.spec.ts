import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUpdateUserComponent } from './view-update-user.component';

describe('ViewUpdateUserComponent', () => {
  let component: ViewUpdateUserComponent;
  let fixture: ComponentFixture<ViewUpdateUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewUpdateUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUpdateUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
