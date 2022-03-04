import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FlatComponent } from 'src/app/components/flat/flat.component';
import { MusicSheet } from 'src/app/model/music-sheet';
import { NewMusicSheet } from 'src/app/model/requests-model/new-music-sheet';
import { NewMusicSheetSong } from 'src/app/model/requests-model/new-music-sheet-song';
import { MusicsheetService } from 'src/app/services/musicsheet.service';

@Component({
  selector: 'app-rearrange-music-sheet',
  templateUrl: './rearrange-music-sheet.component.html',
  styleUrls: ['./rearrange-music-sheet.component.css']
})
export class RearrangeMusicSheetComponent implements OnInit {

  rearrangeForm!: FormGroup;
  score!: string;
  msAuthor!: string;
  msTitle!: string;
  musicSheet!: MusicSheet;
  newMusicSheet?: NewMusicSheet;
  newMusicSheetSong?: NewMusicSheetSong;

  @ViewChild(FlatComponent) child!: FlatComponent;

  constructor(private musicSheetService: MusicsheetService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.route.params.subscribe((res) => {
      this.musicSheetService.getMusicSheetData(res['id']).subscribe((s) => {
        this.score = s.content;
      });
      this.musicSheetService.getMusicSheetById(res['id']).subscribe((ms) => {
        this.musicSheet = ms;
      })
    });

    this.rearrangeForm = this.formBuilder.group({
      author : new FormControl('', Validators.compose([])),
      title: new FormControl('', Validators.compose([])),
      visibility: new FormControl('0', Validators.compose([]))
    })

  }

  rearrangeSheet() {
    
    this.child.getCurrentJsonSheet().then((data: any) => {

      this.newMusicSheetSong = {
        id: this.musicSheet.song.id,
        spotifyId: this.musicSheet.song.spotifyId,
        songtype: Boolean(0),
        title: this.musicSheet.song.title,
        author: this.musicSheet.song.author,
        genreId: this.musicSheet.song.genre.id
      }
      this.newMusicSheet = {
        title: this.rearrangeForm.get('title')?.value,
        author: this.rearrangeForm.get('author')?.value,
        visibility: Boolean(this.rearrangeForm.get('visibility')?.value),
        rearranged: true,
        content: JSON.stringify(data),
        song: this.newMusicSheetSong
      }
      this.musicSheetService.addMusicSheet(this.newMusicSheet).subscribe(() => {
        console.log('apposto');
      })
    })
  }

}
