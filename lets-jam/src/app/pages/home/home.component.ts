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

  allGenre!: Array<Genre>;
  musicSheets!: Array<MusicSheet>;
  musicSheetsByLikes!: Array<MusicSheet>
  filteredSheet: Array<{name:String,sheets:Array<MusicSheet>}> = [
    {
      name:'',
      sheets:[]
    }
  ]

  constructor(private ms: MusicsheetService, private auth: AuthService, private genreService: GenreService) {
  }

  ngOnInit(): void {

    this.orderMusicSheetsBylikes();
    this.musicSheetPerGenre();

  }


  orderMusicSheetsBylikes(): void {
    this.ms.getAllMusicSheets(undefined, 'LIKES','DESC',undefined,undefined,undefined,undefined,undefined,1,5).subscribe((sheets) => {
      console.log(sheets)
      this.musicSheetsByLikes = sheets;
    });
  }

  musicSheetPerGenre() {
    this.genreService.getAllGenres().subscribe((gen) => {
      this.ms.getAllMusicSheets().subscribe((ms) => {
        gen.forEach((genre,index) => {
          const genreSheets = ms?.filter((sheet) => {
            return sheet.song.genre.name == genre.name
          })
          this.filteredSheet[index] = {
            name:genre.name,
            sheets: genreSheets
          }
        })

      })
    });
  }

}
