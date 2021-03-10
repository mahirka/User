import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SilverCardComponent } from './silver-card.component';

describe('SilverCardComponent', () => {
  let component: SilverCardComponent;
  let fixture: ComponentFixture<SilverCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SilverCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SilverCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
