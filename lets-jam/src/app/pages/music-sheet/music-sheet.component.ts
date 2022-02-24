import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { MusicSheet } from 'src/app/model/music-sheet';
import { MusicSheetData } from 'src/app/model/music-sheet-data';
import { CommentService } from 'src/app/services/comment.service';
import { MusicsheetService } from 'src/app/services/musicsheet.service';

@Component({
  selector: 'app-music-sheet',
  templateUrl: './music-sheet.component.html',
  styleUrls: ['./music-sheet.component.css']
})
export class MusicSheetComponent implements OnInit {

  musicSheet!: MusicSheet;
  musicSheetData!: MusicSheetData;
  comments!: Comment[];

  constructor(private route: ActivatedRoute, private musicSheetService: MusicsheetService, private commentService: CommentService) { }

  ngOnInit(): void {

    this.route.params.subscribe((res) => {
      this.musicSheetService.getMusicSheetById(res['id']).subscribe((ms) => {
        this.musicSheet = ms;
        console.log(ms)

        this.commentService.getMusicSheetComments(ms.id).subscribe((res) => {
          this.comments = res;
        });

        // this.musicSheetService.getMusicSheetData(ms.id).subscribe((res) => {
        //   this.musicSheetData = res;
        //   console.log(res);

        // });

      });
    });

  }


}


