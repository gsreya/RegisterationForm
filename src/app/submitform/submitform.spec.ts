import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Submitform } from './submitform';

describe('Submitform', () => {
  let component: Submitform;
  let fixture: ComponentFixture<Submitform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Submitform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Submitform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
