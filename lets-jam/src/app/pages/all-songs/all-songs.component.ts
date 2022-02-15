import { Component, OnInit } from '@angular/core';
import {GenreService} from "../../services/genre.service";
import {Genre} from "../../model/genre";
import {Observable} from "rxjs";

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  genres?: Array<Genre>

  constructor(private gs: GenreService) { }

  ngOnInit(): void {
    this.gs.getAllGenres().subscribe((res) => {
      this.genres = res
    });
  }

}
