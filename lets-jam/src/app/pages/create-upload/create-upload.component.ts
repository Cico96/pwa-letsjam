import { Component, OnInit } from '@angular/core';
import {InstrumentService} from "../../services/instrument.service";
import {Instrument} from "../../model/instrument";
import {GenreService} from "../../services/genre.service";
import {Genre} from "../../model/genre";

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: ['./create-upload.component.css']
})
export class CreateUploadComponent implements OnInit {

  constructor(private is:InstrumentService, private gs: GenreService) { }

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

  manageConfirm() {
    if (!this.showChoose) {
      this.showChoose = !this.showChoose;
    } else {

    }
  }

}
