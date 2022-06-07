import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInWithRecoveryCodeComponent } from './sign-in-with-recovery-code.component';

describe('SignInWithRecoveryCodeComponent', () => {
  let component: SignInWithRecoveryCodeComponent;
  let fixture: ComponentFixture<SignInWithRecoveryCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignInWithRecoveryCodeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInWithRecoveryCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
