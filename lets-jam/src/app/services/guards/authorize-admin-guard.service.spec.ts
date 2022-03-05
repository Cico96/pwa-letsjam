import { TestBed } from '@angular/core/testing';

import { AuthorizeAdminGuardService } from './authorize-admin-guard.service';

describe('AuthorizeAdminGuardService', () => {
  let service: AuthorizeAdminGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthorizeAdminGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
