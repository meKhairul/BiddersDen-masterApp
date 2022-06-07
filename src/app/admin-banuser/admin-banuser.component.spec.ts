import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBanuserComponent } from './admin-banuser.component';

describe('AdminBanuserComponent', () => {
  let component: AdminBanuserComponent;
  let fixture: ComponentFixture<AdminBanuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBanuserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBanuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
