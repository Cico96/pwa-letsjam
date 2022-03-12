import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlatComponent } from 'src/app/components/flat/flat.component';
import { Comment } from 'src/app/model/comment';
import { MusicSheet } from 'src/app/model/music-sheet';
import { MusicSheetData } from 'src/app/model/music-sheet-data';
import { MusicsheetIdCommentBody } from 'src/app/model/requests-model/musicsheetIdCommentBody';
import { MusicsheetMusicsheetIdBody } from 'src/app/model/requests-model/musicsheetMusicsheetIdBody';
import { CommentService } from 'src/app/services/comment.service';
import { MusicsheetService } from 'src/app/services/musicsheet.service';
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import { RefreshTokenService } from 'src/app/services/refresh-token.service';

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
  answerId?: number;
  urlXML!: SafeResourceUrl;
  urlPNG!: any;

  like: boolean = false;

  @ViewChild(FlatComponent) child!: FlatComponent;

  constructor(private route: ActivatedRoute, private musicSheetService: MusicsheetService, private commentService: CommentService, private sanitizer: DomSanitizer) { }

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
        this.comment = '';
        this.commentService.getMusicSheetComments(this.musicSheet.id).subscribe((res) => {
          this.comments = res;
        });
      })
    }
  }

  viewComment(id: number) {
    //this.showAnswer = true;
    this.commentId = id;
  }

  addAnswer($event: KeyboardEvent, id: number) {
    if($event.key == 'Enter') {
      const answer: MusicsheetIdCommentBody = { content: this.answer};
      this.commentService.addComment(this.musicSheet.id, answer, id).subscribe((res) => {
        this.answer = '';
        this.commentService.getReplies(id).subscribe((r) => {
          this.replies = r;
        });
      })
    }
  }

  showReplies(id: number) {
    this.answerId = id;
    this.commentService.getReplies(id).subscribe((res) => {
      if(res.length > 0) {
        this.replies = res;
        console.log(this.replies)
      }
    })
  }
 // commento
  download(event: any) {
    if (event) {
      this.child.embed.getMusicXML().then( (r: any) => {
        const blob = new Blob([r], { type: "application/xml" });
        this.urlXML = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
      });
      this.child.embed.getPNG({
        result: "dataURL",
        layout: "page",
        dpi: 300,
      })
      .then((r: any) => {
        this.urlPNG = r;
      });
    }
  }



  print() {
    this.child.embed.print();
  }

  likeDislike() {

    if(this.like == false) {
      this.musicSheetService.addLike(this.musicSheet.id).subscribe(() => {
        this.musicSheetService.getMusicSheetById(this.musicSheet.id).subscribe((ms) => {
          this.musicSheet = ms;
        })
      });
      this.like = true;
    } else {
      this.musicSheetService.removeLike(this.musicSheet.id).subscribe(() => {
        this.musicSheetService.getMusicSheetById(this.musicSheet.id).subscribe((ms) => {
          this.musicSheet = ms;
        })
      })
      this.like = false;
    }
  }



}


