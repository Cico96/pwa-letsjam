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
    let sortBy = undefined
    let albumType = undefined

    if (this.sidebarForm.get('sortBy')?.value) {
      sortBy = this.sidebarForm.get('sortBy')?.value;
    }

    if (this.sidebarForm.get('albumType')?.value) {
      albumType = this.sidebarForm.get('sortBy')?.value;
    }

    if(this.sidebarForm.get('filter')?.value == 'explicit') {
      explicit = true;
    }else if(this.sidebarForm.get('filter')?.value == 'hasLyrics') {
      hasLyrics = true;
    }

    this.ss.getSongs(this.search, sortBy, undefined, this.genresName, explicit, hasLyrics, albumType).subscribe((s) => {
      this.songs = s;
    })
  }

}
