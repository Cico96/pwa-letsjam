import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MusicSheet } from 'src/app/model/music-sheet';
import { AuthService } from 'src/app/services/auth.service';
import { MusicsheetService } from 'src/app/services/musicsheet.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(private ms: MusicsheetService, private auth: AuthService) { }

  ngOnInit(): void {
  }

  getMusicSheet() {
   console.log(this.ms.getMusicSheetById(1))
   
   this.ms.getMusicSheetById(1).subscribe(
     response => {
       console.log(response);
     }
   )
  }

}
