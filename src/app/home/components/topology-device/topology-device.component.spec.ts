import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologyDeviceComponent } from './topology-device.component';

describe('TopologyDeviceComponent', () => {
  let component: TopologyDeviceComponent;
  let fixture: ComponentFixture<TopologyDeviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopologyDeviceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologyDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
