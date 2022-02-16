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
  songs?: Song[]

  sidebarForm!: FormGroup

  // search?:String = undefined
  // sortby?:String = undefined
  // sortdirection?:String = undefined
  // albumtype?:String = undefined
  // requestGenres?:Array<String> = undefined
  // explicit?:boolean = undefined
  // hasLyrics?:boolean = undefined
  // pagenumber?:number = undefined
  // pagesize?:number = undefined

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
    console.log(this.sidebarForm.value)
    this.gs.getAllGenres().subscribe((res) => {
      this.genres = res
    });
    this.ss.getSongs(undefined, undefined, undefined, undefined, undefined, undefined, undefined, 1, 5).subscribe((res) => {
      console.log(res)
      this.songs = res
    });
  }

}
