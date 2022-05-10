import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiSettingComponent } from './wifi-setting.component';

describe('WifiSettingComponent', () => {
  let component: WifiSettingComponent;
  let fixture: ComponentFixture<WifiSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WifiSettingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
