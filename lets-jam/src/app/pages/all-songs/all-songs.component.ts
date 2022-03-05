import {Component, OnInit} from '@angular/core';
import {GenreService} from "../../services/genre.service";
import {Genre} from "../../model/genre";
import {Song} from "../../model/song";
import {SongService} from "../../services/song.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-all-songs',
  templateUrl: './all-songs.component.html',
  styleUrls: ['./all-songs.component.css']
})
export class AllSongsComponent implements OnInit {

  genres?: Array<Genre>
  songs!: Song[]
  page: number = 1;

  sidebarForm!: FormGroup
  search?: string;

  constructor(private fb: FormBuilder, private gs: GenreService, private ss: SongService) {
    this.sidebarForm = this.fb.group({
      genres: new FormControl('', []),
      sortDirection: new FormControl('', []),
      sortBy: new FormControl('', []),
      albumType: new FormControl('', []),
      explicit: new FormControl('', []),
      hasLyrics: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    this.gs.getAllGenres().subscribe((res) => {
      this.genres = res
    });
    this.ss.getSongs(undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, 5).subscribe((res) => {
      this.songs = res
    });
  }

  pageChanged(num: number){
    this.page = num;
  }

}
