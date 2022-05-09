import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriberFilterComponent } from './subscriber-filter.component';

describe('SubscriberFilterComponent', () => {
  let component: SubscriberFilterComponent;
  let fixture: ComponentFixture<SubscriberFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriberFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscriberFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
