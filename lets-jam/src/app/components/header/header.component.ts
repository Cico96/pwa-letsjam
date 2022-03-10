import { Component, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { AuthService } from 'src/app/services/auth.service';
import {RefreshTokenService} from "../../services/refresh-token.service";
import {User} from "../../model/user";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentLang = this.translate.currentLang;
  loggedUser?: User;
  userSub?: Subscription;

  constructor(private translate: TranslateService, private rts: RefreshTokenService,
              private authToken: AuthTokenService, private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    this.userSub = this.rts.getLoggedUser().subscribe((usr: User | undefined) => {
      // console.log(usr)
      this.loggedUser = usr

    });
  }

  logout() {
    this.authService.logout().subscribe((res) => {
      this.rts.clearRefreshTimeout();
      this.router.navigate(['/login']);
      localStorage.clear();
      this.rts.currentUser.next(undefined)
    });
  }

  isAuthenticated(): boolean {
    return this.authToken.isAuthenticated();
  }

  changeLang(lang: string) {
    this.translate.use(lang).subscribe(() => {
      this.currentLang = lang;
    })
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
  }

}
