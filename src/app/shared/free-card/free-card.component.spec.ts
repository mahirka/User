import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeCardComponent } from './free-card.component';

describe('FreeCardComponent', () => {
  let component: FreeCardComponent;
  let fixture: ComponentFixture<FreeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
