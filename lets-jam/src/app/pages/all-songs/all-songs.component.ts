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
  genresName?: Array<string>;

  constructor(private fb: FormBuilder, private gs: GenreService, private ss: SongService) {
    this.sidebarForm = this.fb.group({
      search: new FormControl(''),
      genres: new FormControl('', []),
      sortBy: new FormControl('', []),
      albumType: new FormControl('', []),
      filter: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.gs.getAllGenres().subscribe((res) => {
      this.genres = res
    });
    this.ss.getSongs().subscribe((res) => {
      console.log(res)
      this.songs = res
    });
  }

  pageChanged(num: number){
    this.page = num;
  }

  genresValues($event: any) {

    if(this.genresName == undefined) {
      this.genresName = [];
    }if(this.genresName != undefined && this.genresName?.includes($event.target.defaultValue)){
      this.genresName = this.genresName.filter((g) => g !== $event.target.defaultValue);
    }else {
      this.genresName?.push($event.target.defaultValue)
    }

  }

  searchResult() {

    let explicit;
    let hasLyrics;

    if(Boolean(this.sidebarForm.get('filter')?.value)) {
      explicit = true;
    }else {
      hasLyrics = true;
    }

    this.ss.getSongs(this.search, this.sidebarForm.get('sortBy')?.value, undefined, this.genresName, explicit, hasLyrics, this.sidebarForm.get('albumType')?.value).subscribe((s) => {
      this.songs = s;
    })
  }

}
