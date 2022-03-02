import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicsheetService } from 'src/app/services/musicsheet.service';

@Component({
  selector: 'app-rearrange-music-sheet',
  templateUrl: './rearrange-music-sheet.component.html',
  styleUrls: ['./rearrange-music-sheet.component.css']
})
export class RearrangeMusicSheetComponent implements OnInit {

  constructor(private musicSheetService: MusicsheetService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route.snapshot.params['id']);
  }

}
