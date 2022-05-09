import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopologyIndexComponent } from './topology-index.component';

describe('TopologyIndexComponent', () => {
  let component: TopologyIndexComponent;
  let fixture: ComponentFixture<TopologyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopologyIndexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopologyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
