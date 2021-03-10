import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterResultModalComponent } from './filter-result-modal.component';

describe('FilterResultModalComponent', () => {
  let component: FilterResultModalComponent;
  let fixture: ComponentFixture<FilterResultModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterResultModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterResultModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
