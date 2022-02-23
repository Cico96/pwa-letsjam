import { Component, OnInit } from '@angular/core';
import {InstrumentService} from "../../services/instrument.service";
import {Instrument} from "../../model/instrument";
import {GenreService} from "../../services/genre.service";
import {Genre} from "../../model/genre";
import {ScoreService} from "../../services/score.service";

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: ['./create-upload.component.css']
})
export class CreateUploadComponent implements OnInit {

  selectedOption?: string;
  printedOption?: string;

  instrumentsSelected?: Array<string>
  score: string = ''

  constructor(private is:InstrumentService, private gs: GenreService, private scoreService: ScoreService) { }

  showChoose:boolean = false
  showInstruments:boolean = false
  showUpload:boolean = false
  confirm:boolean = false
  instruments!:Array<Instrument>
  genres!:Array<Genre>

  ngOnInit(): void {
    this.is.getAllInstruments().subscribe((res) => {
      this.instruments = res;
    });
    this.gs.getAllGenres().subscribe((res) => {
      this.genres = res;
    });
  }

  print() {
    // this.printedOption = this.selectedOption;
    console.log(this.instrumentsSelected)
  }

  manageSelect(instrumentName: string) {
    if ( this.instrumentsSelected !== undefined && this.instrumentsSelected?.includes(instrumentName)) {
      this.instrumentsSelected = this.instrumentsSelected.filter((el) => el !== instrumentName)
    } else if (this.instrumentsSelected !== undefined && !this.instrumentsSelected?.includes(instrumentName)) {
      this.instrumentsSelected?.push(instrumentName);
    } else {
      this.instrumentsSelected = [instrumentName];
    }
  }

  manageConfirm() {
    if (this.instrumentsSelected !== undefined && this.instrumentsSelected.length > 0 ) {
      this.scoreService.makeEmptyScore(this.instrumentsSelected).subscribe(score => {
        this.score = score.score ? score.score : ''
      })
    } else {

      this.showChoose = !this.showChoose;
    }
  }

}
