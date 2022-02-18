import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicSheet } from 'src/app/model/music-sheet';
import { MusicsheetService } from 'src/app/services/musicsheet.service';

@Component({
  selector: 'app-music-sheet',
  templateUrl: './music-sheet.component.html',
  styleUrls: ['./music-sheet.component.css']
})
export class MusicSheetComponent implements OnInit {

  musicSheet!: MusicSheet;

  constructor(private route: ActivatedRoute, private musicSheetService: MusicsheetService) { }

  ngOnInit(): void {

    this.route.params.subscribe((res) => {
      this.musicSheetService.getMusicSheetById(res['id']).subscribe((ms) => {
        this.musicSheet = ms;
        console.log(this.musicSheet);
      })
    });

  }

}
