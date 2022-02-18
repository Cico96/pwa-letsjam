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
      sortDirection: new FormControl(''),
      sortBy: new FormControl(''),
      verified: new FormControl(''),
      rearranged: new FormControl(''),
      pageNumber: new FormControl('')
    });

  }

  pageChanged(num: number){
    this.page = num;
  }

  modelChange($event: any) {

  }

  goToMusicSheet(id: number) {
    this.router.navigate(['/musicSheet', id])
  }

}
