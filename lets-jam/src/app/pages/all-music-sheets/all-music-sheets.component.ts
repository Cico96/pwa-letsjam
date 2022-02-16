import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  musicSheets?: MusicSheet[];

  constructor(public formBuilder: FormBuilder, private genreService: GenreService, private instrumentService: InstrumentService,
    private musicSheetService: MusicsheetService) { }

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
      instruments: new FormControl('')
    });
  }

}
