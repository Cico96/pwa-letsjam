import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { AuthService } from 'src/app/services/auth.service';
import {RefreshTokenService} from "../../services/refresh-token.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentLang = '';

  constructor(private translate: TranslateService, private rts: RefreshTokenService, private authToken: AuthTokenService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

  }

  logout() {
    this.authService.logout().subscribe((res) => {
      this.rts.clearRefreshTimeout();
      localStorage.clear();
    });
  }

  isAuthenticated(): boolean {
    return this.authToken.isAuthenticated();
  }



}
