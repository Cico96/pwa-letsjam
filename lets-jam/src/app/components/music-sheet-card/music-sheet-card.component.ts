import {Component, Input, OnInit} from '@angular/core';
import {MusicSheet} from "../../model/music-sheet";

@Component({
  selector: 'app-music-sheet-card',
  templateUrl: './music-sheet-card.component.html',
  styleUrls: ['./music-sheet-card.component.css']
})
export class MusicSheetCardComponent implements OnInit {

  @Input()
  musicSheet?: MusicSheet;
  
  constructor() { }

  ngOnInit(): void {

  }

 

}
