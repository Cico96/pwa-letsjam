import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
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

  @Output()
  sheetEventLoaded: EventEmitter<boolean>;

  embed?: any

  url!: string;

  constructor() {
    this.sheetEventLoaded = new EventEmitter();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.embed = new Embed(this.flat?.nativeElement, {
      score: "",
      height: "800px",
      embedParams: {
        mode: "edit",
        appId: "59e7684b476cba39490801c2",
        branding: false,
        controlsDisplay: true,
        controlsPanel: false,
        controlsPosition: "top",
        hideFlatPlayback: false,
        layout: "page",
      }
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    try {
      this.embed.loadJSON(JSON.parse(changes['score'].currentValue))
    } catch {
      this.embed.loadMusicXML(changes['score'].currentValue)
      this.embed.on('scoreLoaded', () => {
        this.sheetEventLoaded?.emit(true);
      })
    }
  }

  getCurrentJsonSheet():any {
    return this.embed.getJSON();
  }

  getMusicXML() {

    this.embed.getMusicXML().then((r: any) => {
      const blob = new Blob([r], { type: "application/xml" });
      this.url = window.URL.createObjectURL(blob);
      
    });
    return this.url;
  }


}
