import { TestBed } from '@angular/core/testing';

import { MusicSheetService } from './music-sheet.service';

describe('MusicSheetService', () => {
  let service: MusicSheetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MusicSheetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
