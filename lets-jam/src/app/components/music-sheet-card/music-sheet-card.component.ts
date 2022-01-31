import { Component, OnInit } from '@angular/core';
import { MusicSheet } from 'src/app/model/music-sheet';
@Component({
  selector: 'app-music-sheet-card',
  templateUrl: './music-sheet-card.component.html',
  styleUrls: ['./music-sheet-card.component.css']
})
export class MusicSheetCardComponent implements OnInit {

  id = 1;
  ms: MusicSheet[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
