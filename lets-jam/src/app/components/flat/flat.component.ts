import {Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild} from '@angular/core';
// @ts-ignore
import Embed from 'flat-embed/src/embed';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.css']
})
export class FlatComponent implements OnInit {

  @ViewChild('flat') flat?: ElementRef<HTMLDivElement>;

  @Input()
  score: string = ''

  embed?: any

  constructor() {
  }

  ngAfterViewInit() {
    // console.log('on after view init', this.flat?.nativeElement);
    // this returns null
    this.embed = new Embed(this.flat?.nativeElement, {
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

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['score'].currentValue)
    this.embed.loadJSON(JSON.parse(changes['score'].currentValue))
  }

  ngOnInit(): void {


  }

}
