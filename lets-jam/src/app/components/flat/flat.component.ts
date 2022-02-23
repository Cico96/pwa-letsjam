import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
// @ts-ignore
import Embed from 'flat-embed/src/embed';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.css']
})
export class FlatComponent implements OnInit {

  @ViewChild('flat') flat?: ElementRef<HTMLDivElement>;

  constructor() { }

  ngAfterViewInit() {
    // console.log('on after view init', this.flat?.nativeElement);
    // this returns null
    let embed = new Embed(this.flat?.nativeElement, {
      score: "",
      height: "800px",
      embedParams: {
        mode: "edit",
        appId: "59e7684b476cba39490801c2",
        branding: false,
        controlsPosition: "top"
      }
    });
  }

  ngOnInit(): void {


  }

}
