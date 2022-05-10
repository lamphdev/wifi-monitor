import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WifiSettingFormComponent } from './wifi-setting-form.component';

describe('WifiSettingFormComponent', () => {
  let component: WifiSettingFormComponent;
  let fixture: ComponentFixture<WifiSettingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WifiSettingFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WifiSettingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
