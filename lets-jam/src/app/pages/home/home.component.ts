import {Component, OnInit} from '@angular/core';
import {MusicSheet} from 'src/app/model/music-sheet';
import {AuthService} from 'src/app/services/auth.service';
import {MusicsheetService} from 'src/app/services/musicsheet.service';
import {Observable, Subscription} from "rxjs";
import { GenreService } from 'src/app/services/genre.service';
import { Genre } from 'src/app/model/genre';
import { RefreshTokenService } from 'src/app/services/refresh-token.service';
import {User} from "../../model/user";


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
  ];
  loggedUser?: User;
  userSub?: Subscription;

  constructor(private ms: MusicsheetService, private auth: AuthService, private genreService: GenreService, private refreshToken: RefreshTokenService) {
  }

  ngOnInit(): void {
    this.userSub = this.refreshToken.getLoggedUser().subscribe((usr) => {
      // console.log(usr)
      this.loggedUser = usr
    });

    this.orderMusicSheetsBylikes();
    this.musicSheetPerGenre();
  }


  orderMusicSheetsBylikes(): void {
    this.ms.getAllMusicSheets(undefined, 'LIKES','DESC',undefined,undefined,undefined,undefined,undefined,1,5).subscribe((sheets) => {
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

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

}
