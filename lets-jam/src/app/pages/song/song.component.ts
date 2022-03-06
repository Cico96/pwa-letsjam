import {Component, Input, OnInit} from '@angular/core';
import {SongService} from "../../services/song.service";
import {MusicSheet} from "../../model/music-sheet";
import {Song} from "../../model/song";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {MusicsheetService} from "../../services/musicsheet.service";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  song!:Song;
  id!:any;
  songUrl?:SafeResourceUrl;
  associatedSheet?: Array<MusicSheet>
  page: number = 1;

  constructor(private ss: SongService, private _Activatedroute:ActivatedRoute,
              private sanitizer: DomSanitizer, private ms: MusicsheetService) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.ss.getSongById(this.id).subscribe((sg) => {
        this.songUrl = this.sanitizer.bypassSecurityTrustResourceUrl('https://open.spotify.com/embed/track/'+sg.spotifyId)
        this.song = sg
        this.ms.getAllMusicSheets().subscribe(sheets => {
          this.associatedSheet = sheets.filter((sheet) => {
            return sheet.song.id == sg.id
          });
        })
      });
    });
  }


  pageChanged(num: number){
    this.page = num;
  }

}
