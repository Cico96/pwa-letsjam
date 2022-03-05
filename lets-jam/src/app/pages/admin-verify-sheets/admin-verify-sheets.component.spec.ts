import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVerifySheetsComponent } from './admin-verify-sheets.component';

describe('AdminVerifySheetsComponent', () => {
  let component: AdminVerifySheetsComponent;
  let fixture: ComponentFixture<AdminVerifySheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVerifySheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVerifySheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
