import { Component, OnInit } from '@angular/core';
import {RefreshTokenService} from "../../services/refresh-token.service";
import {User} from "../../model/user";
import {Genre} from "../../model/genre";
import {Instrument} from "../../model/instrument";
import {UserService} from "../../services/user.service";
import {MusicsheetService} from "../../services/musicsheet.service";
import {MusicSheet} from "../../model/music-sheet";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  loggedUser?: User;
  prefererdGenres!: Array<Genre>
  preferredInstruments!:Array<Instrument>
  myMusicSheets!:Array<MusicSheet>
  page: number = 1;
  userSub?: Subscription;

  constructor(private rts: RefreshTokenService, private us: UserService, private mss: MusicsheetService, private router: Router) { }

  ngOnInit(): void {
    this.userSub = this.rts.getLoggedUser().subscribe((usr: User | undefined) => {
      if (usr && usr.id) {
        this.loggedUser = usr

        if (this.loggedUser.id !== undefined) {
          this.us.getUserPreferredGenres(usr.id).subscribe((response) => {
            this.prefererdGenres = response;
          })
          this.us.getUserPreferredInstruments(usr.id).subscribe((response) => {
            this.preferredInstruments = response;
          })
          this.mss.getAllMusicSheets().subscribe((data) => {
            this.myMusicSheets = data.filter((sheet) =>  sheet.user.id == usr.id )
          })
        }
      }
    })
  }

  pageChanged(num: number){
    this.page = num;
  }

  goToMusicSheet(id: number) {
    this.router.navigate(['/musicSheet', id])
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

}
