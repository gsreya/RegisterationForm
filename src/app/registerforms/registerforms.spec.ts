import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Registerforms } from './registerforms';

describe('Registerforms', () => {
  let component: Registerforms;
  let fixture: ComponentFixture<Registerforms>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Registerforms]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Registerforms);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
