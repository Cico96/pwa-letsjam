import {Component, OnInit, ViewChild} from '@angular/core';
import {InstrumentService} from "../../services/instrument.service";
import {Instrument} from "../../model/instrument";
import {GenreService} from "../../services/genre.service";
import {Genre} from "../../model/genre";
import {ScoreService} from "../../services/score.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {NewMusicSheet} from "../../model/requests-model/new-music-sheet";
import {NewMusicSheetSong} from "../../model/requests-model/new-music-sheet-song";
// @ts-ignore
import Embed from 'flat-embed/src/embed';
import {FlatComponent} from "../../components/flat/flat.component";
import {SongService} from "../../services/song.service";
import {Song} from "../../model/song";
import {RefreshTokenService} from "../../services/refresh-token.service";
import {MusicsheetService} from "../../services/musicsheet.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-upload',
  templateUrl: './create-upload.component.html',
  styleUrls: ['./create-upload.component.css']
})
export class CreateUploadComponent implements OnInit {

  selectedOption?: string;

  instrumentsSelected?: Array<string>
  file?: any;
  score: string = '';
  sheetTitle?: string;
  sheetAuthor?: string;
  newSheetForm!: FormGroup;

  @ViewChild(FlatComponent) child!: FlatComponent;

  newMusicSheet?: NewMusicSheet;
  newMusicSheetSong?: NewMusicSheetSong;
  availableSongs?: Array<Song>;
  choosenNewSong?: Song;

  constructor(private formBuilder: FormBuilder, private is: InstrumentService, private mss: MusicsheetService, private refreshT: RefreshTokenService,
              private gs: GenreService, private scoreService: ScoreService, private songService: SongService, private router: Router) {
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

    this.newSheetForm = this.formBuilder.group({
      sheetTitle: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.required
      ])),
      sheetAuthor: new FormControl('', Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(30),
        Validators.required
      ])),
      songType: new FormControl('0', Validators.compose([])),
      song: new FormControl('', Validators.compose([])),
      songTitle: new FormControl('', Validators.compose([

      ])),
      songAuthor: new FormControl('', Validators.compose([

      ])),
      newSheetGenre: new FormControl('', Validators.compose([Validators.required])),
      musicSheetVisibility: new FormControl('0', Validators.compose([])),
    });
  }

  onFileChange(event: any) {
    this.file = event.target;
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
        let reader = new FileReader()
        reader.onload = (e) => {
          if (typeof e.target!.result == 'string') {
            this.score = e.target!.result;
          }
        }
        reader.readAsText(this.file.files[0]);
      }
      this.showChooseInstruments = false;
    }
  }

  extractInfo(isLoaded: boolean) {
    if (isLoaded) {
      this.child.getCurrentJsonSheet().then((data: any) => {

        if (this.selectedOption == 'carica') {
          this.scoreService.analyzeScore({
            score: JSON.stringify(data)
          }).subscribe((data) => {
              this.sheetTitle = data.title;
              this.sheetAuthor = data.author;
            },
            (err) => {
              console.log(err.error)
            });
        }

      })
      this.showFileData = true
    }
  }

  searchSong(event: any) {
    if (event != undefined) {
      this.songService.getSongs(event.target.value).subscribe((response) => {
        this.availableSongs = response
      })
    }
  }

  selectSong(sg: Song) {
    this.availableSongs = undefined;
    this.newSheetForm.patchValue({song: sg.title})
    this.choosenNewSong = sg;
  }

  saveSheet() {
    if(this.newSheetForm.valid) {
      this.child.getCurrentJsonSheet().then((data: any) => {
        const songType = !parseInt(this.newSheetForm.get('songType')?.value)
        this.newMusicSheetSong = {
          id: songType ? this.choosenNewSong?.id : undefined,
          spotifyId: songType ? this.choosenNewSong?.spotifyId : undefined,
          songtype: songType,
          title: songType ? this.choosenNewSong!.title : this.newSheetForm.get('songTitle')?.value,
          author: songType ? this.choosenNewSong!.author : this.newSheetForm.get('songAuthor')?.value,
          genreId: this.newSheetForm.get('newSheetGenre')?.value,
        }
        this.newMusicSheet = {
          title: this.newSheetForm.get('sheetTitle')?.value,
          author: this.newSheetForm.get('sheetAuthor')?.value,
          visibility: Boolean(this.newSheetForm.get('musicSheetVisibility')?.value),
          rearranged: false,
          content: JSON.stringify(data),
          song: this.newMusicSheetSong,
          // user: this.refreshT.getLoggedUser(),
        }
        this.mss.addMusicSheet(this.newMusicSheet).subscribe(() => {
        });
      })
    }
  }
}
