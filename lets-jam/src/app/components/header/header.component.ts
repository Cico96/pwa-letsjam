import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentLang = '';

  auth!: boolean;
  constructor(private translate: TranslateService, private authToken: AuthTokenService, private authService: AuthService) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;

    if(this.authToken.getAuthToken() != null) {
      this.auth = true;
    }else {
      this.auth = false;
    }
  }

  logout() {
    this.authService.logout('response').subscribe((res) => {
      console.log(res)
      localStorage.clear();
    });
  }

}
