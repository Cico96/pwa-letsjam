import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../model/song";
import {MusicSheet} from "../../model/music-sheet";

@Component({
  selector: 'app-song-card',
  templateUrl: './song-card.component.html',
  styleUrls: ['./song-card.component.css']
})
export class SongCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input()
  set song(song: Song | undefined) {}

}
