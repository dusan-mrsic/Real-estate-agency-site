import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRealEstatesComponent } from './my-real-estates.component';

describe('MyRealEstatesComponent', () => {
  let component: MyRealEstatesComponent;
  let fixture: ComponentFixture<MyRealEstatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRealEstatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRealEstatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
