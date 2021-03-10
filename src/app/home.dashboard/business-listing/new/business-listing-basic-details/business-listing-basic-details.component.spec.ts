import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessListingBasicDetailsComponent } from './business-listing-basic-details.component';

describe('BusinessListingBasicDetailsComponent', () => {
  let component: BusinessListingBasicDetailsComponent;
  let fixture: ComponentFixture<BusinessListingBasicDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessListingBasicDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessListingBasicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
