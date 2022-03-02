import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RearrangeMusicSheetComponent } from './rearrange-music-sheet.component';

describe('RearrangeMusicSheetComponent', () => {
  let component: RearrangeMusicSheetComponent;
  let fixture: ComponentFixture<RearrangeMusicSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RearrangeMusicSheetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RearrangeMusicSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
