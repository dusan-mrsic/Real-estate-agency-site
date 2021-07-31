import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesPercentComponent } from './sales-percent.component';

describe('SalesPercentComponent', () => {
  let component: SalesPercentComponent;
  let fixture: ComponentFixture<SalesPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesPercentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
