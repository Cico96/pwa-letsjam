import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/model/comment';
import { MusicSheet } from 'src/app/model/music-sheet';
import { MusicSheetData } from 'src/app/model/music-sheet-data';
import { MusicsheetIdCommentBody } from 'src/app/model/requests-model/musicsheetIdCommentBody';
import { MusicsheetMusicsheetIdBody } from 'src/app/model/requests-model/musicsheetMusicsheetIdBody';
import { CommentService } from 'src/app/services/comment.service';
import { MusicsheetService } from 'src/app/services/musicsheet.service';

@Component({
  selector: 'app-music-sheet',
  templateUrl: './music-sheet.component.html',
  styleUrls: ['./music-sheet.component.css']
})
export class MusicSheetComponent implements OnInit {

  musicSheet!: MusicSheet;
  score!: string;
  comments!: Comment[];
  instrumentMapping!: Array<string>
  comment!: string;
  answer!: string;
  //showAnswer: boolean = false;
  replies!: Comment[];
  commentId?: number;

  constructor(private route: ActivatedRoute, private musicSheetService: MusicsheetService, private commentService: CommentService) { }

  ngOnInit(): void {

    this.route.params.subscribe((res) => {
      this.musicSheetService.getMusicSheetById(res['id']).subscribe((ms) => {
        this.musicSheet = ms;

        this.commentService.getMusicSheetComments(ms.id).subscribe((res) => {
          this.comments = res;
        });

        this.musicSheetService.getMusicSheetData(ms.id).subscribe((res) => {
          this.score = res.content;
          let values = [];
          for (const [key] of Object.entries(res.instrumentMapping)) {
            values.push(`${key}`);
          }
          this.instrumentMapping = values;

        });

      });
    });

  }

  sendComment($event: KeyboardEvent) {
    if($event.key == 'Enter') {
      const comment: MusicsheetIdCommentBody = { content: this.comment};
      this.commentService.addComment(this.musicSheet.id, comment).subscribe((res) => {
        console.log(res);
        this.comment = '';
        this.commentService.getMusicSheetComments(this.musicSheet.id).subscribe((res) => {
          this.comments = res;  
        });
      })
    }
  }

  viewComment(id: number) {
    //this.showAnswer = true;
    console.log(id)
    this.commentId = id;  
  }

  addAnswer($event: KeyboardEvent, id: number) {
    if($event.key == 'Enter') {
      const answer: MusicsheetIdCommentBody = { content: this.answer};
      this.commentService.addComment(this.musicSheet.id, answer, id).subscribe((res) => {
        this.answer = '';
        
      })
    }
  }

  showReplies(id: number) {
    this.commentService.getReplies(id).subscribe((res) => {
      if(res.length > 0) {
        this.replies = res;
        console.log(this.replies)
      }
    })
  }

  downloadXml() {
    
  }


}


