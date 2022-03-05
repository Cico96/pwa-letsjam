import {Component, OnInit} from '@angular/core';
import {RefreshTokenService} from "../../services/refresh-token.service";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {Genre} from "../../model/genre";
import {Instrument} from "../../model/instrument";

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {

  loggedUser!: User;
  prefererdGenres!: Array<Genre>
  preferredInstruments!: Array<Instrument>


  constructor(private rts: RefreshTokenService, private us: UserService) {
  }

  ngOnInit(): void {
    this.loggedUser = this.rts.getLoggedUser()
    if (this.loggedUser.id !== undefined) {
      this.us.getUserPreferredGenres(this.loggedUser.id).subscribe((response) => {
        this.prefererdGenres = response;
      })
      this.us.getUserPreferredInstruments(this.loggedUser.id).subscribe((response) => {
        this.preferredInstruments = response;
      })
    }
  }

}
