import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RefreshTokenService} from "../../services/refresh-token.service";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {Genre} from "../../model/genre";
import {Instrument} from "../../model/instrument";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GenreService} from "../../services/genre.service";
import {InstrumentService} from "../../services/instrument.service";
import {UserUserIdBody} from "../../model/requests-model/userUserIdBody";
import {UserIdGenresBody} from "../../model/requests-model/userIdGenresBody";
import {UserIdInstrumentsBody} from "../../model/requests-model/userIdInstrumentsBody";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent implements OnInit {

  @ViewChild('avat') avatarNode?: ElementRef<HTMLImageElement>

  loggedUser!: User;
  prefererdGenres!: Array<Genre>
  preferredInstruments!: Array<Instrument>
  modifyUserForm!: FormGroup;
  genres!: Array<Genre>;
  instruments!: Array<Instrument>;
  instrumentsToUpdate?: Array<string>;
  genresToUpdate?: Array<string>;
  userSub?: Subscription;

  newAvatarFile?: any;

  constructor(private formBuilder: FormBuilder, private rts: RefreshTokenService, private us: UserService,
  private genreService: GenreService, private InstrumentsService: InstrumentService) {
  }

  ngOnInit(): void {
    this.userSub = this.rts.getLoggedUser().subscribe((usr: User | undefined) => {
      if (usr) {
        this.loggedUser = usr
      }
    })
    if (this.loggedUser.id !== undefined) {
      let id = this.loggedUser.id
      this.us.getUserPreferredGenres(id).subscribe((response) => {
        this.prefererdGenres = response;

        this.genreService.getAllGenres().subscribe((response) => {
          this.genres = response;
        })

      })

      this.us.getUserPreferredInstruments(id).subscribe((response) => {
        this.preferredInstruments = response;

        this.InstrumentsService.getAllInstruments().subscribe((response) => {
          this.instruments = response;
        })

      })
    }

    this.modifyUserForm = this.formBuilder.group({
      firstname: new FormControl(this.loggedUser.firstname, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
      ])),
      lastname: new FormControl(this.loggedUser.lastname, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
      ])),
      username: new FormControl(this.loggedUser.username, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
      ])),
      email: new FormControl(this.loggedUser.email, Validators.compose([
        Validators.minLength(2),
        Validators.maxLength(20),
      ])),
      genres: new FormControl(),
      instruments: new FormControl(),
    });
  }

  instrumetsValues(event: any){
    if(this.instrumentsToUpdate == undefined) {
      this.instrumentsToUpdate = [];
    }if(this.instrumentsToUpdate != undefined && this.instrumentsToUpdate.includes(event.target.value)) {
      this.instrumentsToUpdate = this.instrumentsToUpdate?.filter((i) => i !== event.target.value);
    }else {
      this.instrumentsToUpdate?.push(event.target.value)
    }
  }

  genresValues(event: any){
    if(this.genresToUpdate == undefined) {
      this.genresToUpdate = [];
    }if(this.genresToUpdate != undefined && this.genresToUpdate.includes(event.target.value)) {
      this.genresToUpdate = this.genresToUpdate?.filter((i) => i !== event.target.value);
    }else {
      this.genresToUpdate?.push(event.target.value)
    }
  }

  onFileChange(event: any) {
    if (this.avatarNode) {
      this.avatarNode.nativeElement.src = URL.createObjectURL(event.target.files[0])
    }
    this.newAvatarFile = event.target.files[0];
  }

  updateUser() {
    let newAvatar = this.newAvatarFile

    let newUser: UserUserIdBody = {
      firstname: this.modifyUserForm.get('firstname')?.value,
      lastname: this.modifyUserForm.get('lastname')?.value,
      email: this.modifyUserForm.get('email')?.value,
    }

    if (this.loggedUser.id !== undefined) {
      let userId = this.loggedUser.id
      this.us.updateUserById(newUser, userId).subscribe(data => {
        // console.log(data)
      });

      this.genresToUpdate?.forEach((genre: string) => {
        let addGenre: UserIdGenresBody = {
          genreId: parseInt(genre),
        }
        this.us.addPreferredGenre(userId ,addGenre).subscribe(data => {
          // console.log(data)
        });
      })

      this.instrumentsToUpdate?.forEach((instrument:string) => {
        let addInstrument: UserIdInstrumentsBody = {
          instrumentId: parseInt(instrument),
        }

        this.us.addPreferredInstrument(userId, addInstrument).subscribe(data => {
          // console.log(data)
        });
      })

      if (newAvatar) {
        this.us.updateUserAvatar(newAvatar).subscribe(data => {
          console.log(data)
        });
      }

      setTimeout(() => {
        this.rts.saveLoggedUser(JSON.stringify(userId))
      },1000)
    }
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

}
