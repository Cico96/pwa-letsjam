import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentLang = '';

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.currentLang = this.translate.currentLang;
    console.log(this.translate.currentLang);
  }

}
