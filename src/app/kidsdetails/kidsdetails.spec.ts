import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Kidsdetails } from './kidsdetails';

describe('Kidsdetails', () => {
  let component: Kidsdetails;
  let fixture: ComponentFixture<Kidsdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Kidsdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Kidsdetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
