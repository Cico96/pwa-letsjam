import { Component, OnInit } from '@angular/core';
import { MusicSheet } from 'src/app/model/music-sheet';
import { MusicSheetService } from 'src/app/services/music-sheet.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  id = 1;
  ms: {} = {};
  
  constructor(private msService: MusicSheetService) { }

  ngOnInit(): void {
    this.ms = this.msService.getMusicSheetById(this.id);
    console.log(this.ms);
  }

}
