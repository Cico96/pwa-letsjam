import {Component, OnInit} from '@angular/core';
import {MusicSheet} from 'src/app/model/music-sheet';
import {AuthService} from 'src/app/services/auth.service';
import {MusicsheetService} from 'src/app/services/musicsheet.service';
import {Observable} from "rxjs";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  orderedSheets?: Array<MusicSheet>;

  constructor(private ms: MusicsheetService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.orderMusicSheetsBylikes();
  }

  getMusicSheet() {
    console.log(this.ms.getMusicSheetById(1))

    this.ms.getMusicSheetById(1).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  orderMusicSheetsBylikes(): void {
    let allMusicsheets: Observable<Array<MusicSheet>> = this.ms.getAllMusicSheets();
    allMusicsheets.subscribe((sheets) => {
        this.orderedSheets = sheets.sort((a,b) => {return (a.likes - b.likes < 0) ? -1 : (a.likes - b.likes > 0) ? 1 : 0})
    });
  }

}
