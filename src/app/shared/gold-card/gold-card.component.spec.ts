import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoldCardComponent } from './gold-card.component';

describe('GoldCardComponent', () => {
  let component: GoldCardComponent;
  let fixture: ComponentFixture<GoldCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoldCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoldCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
