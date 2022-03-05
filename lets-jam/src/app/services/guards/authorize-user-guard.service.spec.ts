import { TestBed } from '@angular/core/testing';

import { AuthorizeUserGuardService } from './authorize-user-guard.service';

describe('AuthorizeUserGuardService', () => {
  let service: AuthorizeUserGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizeUserGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
