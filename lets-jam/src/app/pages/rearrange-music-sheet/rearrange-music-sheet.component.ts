import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MusicSheet } from 'src/app/model/music-sheet';
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

  constructor(private musicSheetService: MusicsheetService, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.route.params.subscribe((res) => {
      this.musicSheetService.getMusicSheetData(res['id']).subscribe((s) => {
        this.score = s.content;
      });
    });

    this.rearrangeForm = this.formBuilder.group({
      author : new FormControl('', Validators.compose([])),
      title: new FormControl('', Validators.compose([])),
      visibility: new FormControl('0', Validators.compose([]))
    })

  }

  rearrangeSheet() {
    //handle form
  }

}
