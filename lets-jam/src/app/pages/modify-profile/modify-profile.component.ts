import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {RefreshTokenService} from "../../services/refresh-token.service";
import {UserService} from "../../services/user.service";
import {User} from "../../model/user";
import {Genre} from "../../model/genre";
import {Instrument} from "../../model/instrument";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GenreService} from "../../services/genre.service";
import {InstrumentService} from "../../services/instrument.service";

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

  newAvatarFile?: any;

  constructor(private formBuilder: FormBuilder, private rts: RefreshTokenService, private us: UserService,
  private genreService: GenreService, private InstrumentsService: InstrumentService) {
  }

  ngOnInit(): void {
    this.loggedUser = this.rts.getLoggedUser()
    if (this.loggedUser.id !== undefined) {
      let id = this.loggedUser.id
      this.us.getUserPreferredGenres(id).subscribe((response) => {
        this.prefererdGenres = response;

        this.us.getUserPreferredInstruments(id).subscribe((response) => {
          this.preferredInstruments = response;

          this.genreService.getAllGenres().subscribe((response) => {
            this.genres = response;

            this.InstrumentsService.getAllInstruments().subscribe((response) => {
              this.instruments = response;
            })
          })
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
      // prefererdGenres: new FormArray(
      //   this.genres.map(el => {
      //     return this.formBuilder.control(true)
      //   })
      // ),
      // preferredInstruments: new FormArray(
      //   this.instruments.map(el => {
      //     return this.formBuilder.control(true)
      //   })
      // ),
    });
  }

  onFileChange(event: any) {
    if (this.avatarNode) {
      this.avatarNode.nativeElement.src = URL.createObjectURL(event.target.files[0])
    }
    this.newAvatarFile = event.target.files[0];
  }

  isPreferredInstrument(preferredI:Array<Instrument>,instrument:Instrument) {
    let result = preferredI.find((el) => {return el.id == instrument.id})
    console.log(result !== undefined)
    return result !== undefined
  }

  updateUser() {
    let genres = this.modifyUserForm.get('email')?.value
    let instruments = this.modifyUserForm.get('instruments')?.value
    let newAvatar = this.newAvatarFile

    let newUser = {
      firstname: this.modifyUserForm.get('firstname')?.value,
      lastname: this.modifyUserForm.get('lastname')?.value,
      email: this.modifyUserForm.get('email')?.value,
    }

    genres.forEach((genre:Genre) => {
      let addGenre = {
        genreId: genre,
      }
    })

    instruments.forEach((instrument:Instrument) => {
      let addInstrument = {
        genreId: instrument,
      }
    })

    // this.us.updateUserById();
    // this.us.addPreferredGenre();
    // this.us.addPreferredInstrument();
    // this.us.updateUserAvatar();

  }

}
