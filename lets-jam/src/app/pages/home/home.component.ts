import {Component, OnInit} from '@angular/core';
import {MusicSheet} from 'src/app/model/music-sheet';
import {AuthService} from 'src/app/services/auth.service';
import {MusicsheetService} from 'src/app/services/musicsheet.service';
import {Observable} from "rxjs";
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from 'src/app/model/genre';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  orderedSheets?: Array<MusicSheet>;
  allGenre!: Array<string>;
  musicSheetsByGenre!: Array<MusicSheet>;

  constructor(private ms: MusicsheetService, private auth: AuthService, private genreService: GenreService) {
  }

  ngOnInit(): void {

    this.orderMusicSheetsBylikes();
    this.musicSheetPerGenre();
  }


  orderMusicSheetsBylikes(): void {
    let allMusicsheets: Observable<Array<MusicSheet>> = this.ms.getAllMusicSheets();
    allMusicsheets.subscribe((sheets) => {
        this.orderedSheets = sheets.sort((a,b) => {return (a.likes - b.likes < 0) ? -1 : (a.likes - b.likes > 0) ? 1 : 0})
    });
  }

  musicSheetPerGenre() {

    this.genreService.getAllGenres().subscribe((gen) => {
      gen.forEach((g) => {
        this.allGenre.push(g.name);
      });
    });

    this.ms.getAllMusicSheets(undefined, undefined, undefined, this.allGenre, undefined, undefined, undefined, undefined, undefined, undefined).subscribe((ms) => {
      this.musicSheetsByGenre = ms;
    })
  }

}
