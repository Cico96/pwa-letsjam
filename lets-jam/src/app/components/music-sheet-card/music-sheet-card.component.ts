import { Component, OnInit } from '@angular/core';
import { MusicSheet } from 'src/app/model/music-sheet';
import { MusicsheetService } from 'src/app/services/musicsheet.service';

@Component({
  selector: 'app-music-sheet-card',
  templateUrl: './music-sheet-card.component.html',
  styleUrls: ['./music-sheet-card.component.css']
})
export class MusicSheetCardComponent implements OnInit {

  ms!: MusicSheet;
  id = 1;

  constructor(private msService: MusicsheetService) { }

  ngOnInit(): void {
    this.msService.getMusicSheetById(1).subscribe((res) => {
      this.ms = res;
    })
  }

}
