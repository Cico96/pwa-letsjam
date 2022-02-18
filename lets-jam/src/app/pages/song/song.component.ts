import {Component, Input, OnInit} from '@angular/core';
import {SongService} from "../../services/song.service";
import {MusicSheet} from "../../model/music-sheet";
import {Song} from "../../model/song";
import {Observable} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-song',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css']
})
export class SongComponent implements OnInit {

  song!:Song;
  id!:any;

  constructor(private ss: SongService, private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.ss.getSongById(this.id).subscribe((sg) => {
        this.song = sg
      });
    });
  }

}
