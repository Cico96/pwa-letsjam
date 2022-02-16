import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../model/song";
import {MusicSheet} from "../../model/music-sheet";
import {SongComponent} from "../../pages/song/song.component";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {

  @Input()
  song?: Song

  constructor() { }

  ngOnInit(): void {
  }

}
