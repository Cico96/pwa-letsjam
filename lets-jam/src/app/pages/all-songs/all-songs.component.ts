import {Component, OnInit} from '@angular/core';
import {GenreService} from "../../services/genre.service";
import {Genre} from "../../model/genre";
import {Song} from "../../model/song";
import {SongService} from "../../services/song.service";

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  genres?: Array<Genre>
  songs?: Song[]

  constructor(private gs: GenreService, private ss: SongService) {
  }

  ngOnInit(): void {
    this.gs.getAllGenres().subscribe((res) => {
      this.genres = res
    });
    this.ss.getSongs(undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, 5).subscribe((res) => {
      console.log(res)
      this.songs = res
    });
  }

}
