import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatinumCardComponent } from './platinum-card.component';

describe('PlatinumCardComponent', () => {
  let component: PlatinumCardComponent;
  let fixture: ComponentFixture<PlatinumCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatinumCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatinumCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
