import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paymentmode } from './paymentmode';

describe('Paymentmode', () => {
  let component: Paymentmode;
  let fixture: ComponentFixture<Paymentmode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paymentmode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paymentmode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
