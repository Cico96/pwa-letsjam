import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMusicSheetsComponent } from './all-music-sheets.component';

describe('AllMusicSheetsComponent', () => {
  let component: AllMusicSheetsComponent;
  let fixture: ComponentFixture<AllMusicSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllMusicSheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllMusicSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
