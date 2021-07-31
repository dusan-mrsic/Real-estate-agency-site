import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RealEstateRequestsComponent } from './real-estate-requests.component';

describe('RealEstateRequestsComponent', () => {
  let component: RealEstateRequestsComponent;
  let fixture: ComponentFixture<RealEstateRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RealEstateRequestsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RealEstateRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
