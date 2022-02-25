import {Component, OnInit} from '@angular/core';
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
  file?: any
  score: string = ''

  constructor(private is: InstrumentService, private gs: GenreService, private scoreService: ScoreService) {
  }

  init: boolean = true
  showChooseInstruments: boolean = false
  showUploadFile: boolean = false
  showFileData: boolean = false
  confirm: boolean = false
  instruments!: Array<Instrument>
  genres!: Array<Genre>

  ngOnInit(): void {
    this.is.getAllInstruments().subscribe((res) => {
      this.instruments = res;
    });
    this.gs.getAllGenres().subscribe((res) => {
      this.genres = res;
    });
  }

  // print() {
  //   // this.printedOption = this.selectedOption;
  //   console.log(this.selectedOption)
  // }

  onFileChange(event: any) {
    this.file = event.target;
    console.log(this.selectedOption)
  }

  manageSelect(instrumentName: string) {
    if (this.instrumentsSelected !== undefined && this.instrumentsSelected?.includes(instrumentName)) {
      this.instrumentsSelected = this.instrumentsSelected.filter((el) => el !== instrumentName)
    } else if (this.instrumentsSelected !== undefined && !this.instrumentsSelected?.includes(instrumentName)) {
      this.instrumentsSelected?.push(instrumentName);
    } else {
      this.instrumentsSelected = [instrumentName];
    }
  }

  manageConfirm() {
    if (this.selectedOption == 'crea') {
      if (!this.showChooseInstruments) {
        this.showChooseInstruments = true;
      } else if (this.instrumentsSelected !== undefined && this.instrumentsSelected.length > 0) {
        this.scoreService.makeEmptyScore(this.instrumentsSelected).subscribe(score => {
          this.score = score.score ? score.score : ''
          this.showChooseInstruments = false;
          this.init = false;
          this.showFileData = true;
        })
      }
      this.showUploadFile = false
    } else if (this.selectedOption == 'carica') {

      if (!this.showUploadFile) {
        this.showUploadFile = true;
      } else if (this.file !== undefined && this.file) {
        // console.log(this.file)
        let reader = new FileReader()
        reader.onload = (e) => {
          // console.log(e.target?.result);
          if (typeof e.target!.result == 'string') {
            this.score = e.target!.result;
          }
        }
        reader.readAsText(this.file.files[0]);
        // this.scoreService.analyzeScore(this.instrumentsSelected).subscribe(score => {
        //   this.score = score.score ? score.score : ''
        //   this.showChooseInstruments = false;
        //   this.init = false;
        //   this.showFileData = true;
        // })
      }
      this.showChooseInstruments = false;
    }
  }

}
