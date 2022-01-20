import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicSheetCardComponent } from './music-sheet-card.component';

describe('MusicSheetCardComponent', () => {
  let component: MusicSheetCardComponent;
  let fixture: ComponentFixture<MusicSheetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicSheetCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicSheetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
