import { TestBed } from '@angular/core/testing';

import { WifiSettingService } from './wifi-setting.service';

describe('WifiSettingService', () => {
  let service: WifiSettingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WifiSettingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
