import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-flat',
  templateUrl: './flat.component.html',
  styleUrls: ['./flat.component.css']
})
export class FlatComponent implements OnInit {

  @ViewChild('flat') flat!: ElementRef;

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    let Flat = this.loadJsScript(this.renderer,'https://prod.flat-cdn.com/embed-js/v1.1.0/embed.min.js')
    // let embed = new Flat.Embed(this.flat, {
    //   score: "",
    //   height: "800px",
    //   embedParams: {
    //     mode: "edit",
    //     appId: "59e7684b476cba39490801c2",
    //     branding: false,
    //     controlsPosition: "top"
    //   }
    // });
  }

  public loadJsScript(renderer: Renderer2, src: string): HTMLScriptElement {
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    renderer.appendChild(document.body, script);
    return script;
  }

}
