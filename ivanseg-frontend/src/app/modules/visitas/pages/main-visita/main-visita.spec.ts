import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainVisita } from './main-visita';

describe('MainVisita', () => {
  let component: MainVisita;
  let fixture: ComponentFixture<MainVisita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainVisita],
    }).compileComponents();

    fixture = TestBed.createComponent(MainVisita);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
