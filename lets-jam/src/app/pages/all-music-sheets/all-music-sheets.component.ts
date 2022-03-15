import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Genre } from 'src/app/model/genre';
import { Instrument } from 'src/app/model/instrument';
import { MusicSheet } from 'src/app/model/music-sheet';
import { GenreService } from 'src/app/services/genre.service';
import { InstrumentService } from 'src/app/services/instrument.service';
import { MusicsheetService } from 'src/app/services/musicsheet.service';


@Component({
  selector: 'app-all-music-sheets',
  templateUrl: './all-music-sheets.component.html',
  styleUrls: ['./all-music-sheets.component.css']
})
export class AllMusicSheetsComponent implements OnInit {

  sidebarForm!: FormGroup;
  genres?: Genre[];
  instruments?: Instrument[];
  musicSheets!: MusicSheet[]
  page: number = 1;

  search?: string;
  instrumentsName?: Array<string>;
  genresName?: Array<string>;



  constructor(public formBuilder: FormBuilder, private genreService: GenreService, private instrumentService: InstrumentService,
    private musicSheetService: MusicsheetService, private router: Router) { }

  ngOnInit(): void {

    this.musicSheetService.getAllMusicSheets().subscribe((res) => {
      this.musicSheets = res;
    });

    this.instrumentService.getAllInstruments().subscribe((res) => {
      this.instruments = res;
    });

    this.genreService.getAllGenres().subscribe((res) => {
      this.genres = res;
    });

    this.sidebarForm = this.formBuilder.group({
      search: new FormControl(''),
      genres: new FormControl(''),
      instruments: new FormControl(''),
      sortBy: new FormControl(''),
      filter: new FormControl('')
    });

  }

  pageChanged(num: number){
    this.page = num;
  }


  goToMusicSheet(id: number) {
    this.router.navigate(['/musicSheet', id])
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

  instrumetsValues($event: any) {
    if(this.instrumentsName == undefined) {
      this.instrumentsName = [];
    }if(this.instrumentsName != undefined && this.instrumentsName.includes($event.target.defaultValue)) {
      this.instrumentsName = this.instrumentsName?.filter((i) => i !== $event.target.defaultValue);
    }else {
      this.instrumentsName?.push($event.target.defaultValue)
    }
  }

  searchResult() {
    // if(this.search != undefined) {
    //   console.log(this.search)
    // }
    // console.log(Boolean(this.sidebarForm.get('verified')?.value));
    // console.log(Boolean(this.sidebarForm.get('rearranged')?.value));
    let verified;
    let rearranged;
    let sortBy = undefined

    if (this.sidebarForm.get('sortBy')?.value) {
      sortBy = this.sidebarForm.get('sortBy')?.value;
    }

    if(this.sidebarForm.get('filter')?.value == 'verified') {
      verified = true;
    }else if(this.sidebarForm.get('filter')?.value == 'rearranged') {
      rearranged = true;
    }

    this.musicSheetService.getAllMusicSheets(this.search, sortBy, undefined, this.genresName, this.instrumentsName, verified, rearranged).subscribe((ms) => {
      this.musicSheets = ms;
    })
  }

}
