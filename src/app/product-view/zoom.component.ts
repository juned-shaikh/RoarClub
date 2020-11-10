import { Component, Input,HostListener,ViewChild ,ElementRef,Output,EventEmitter,OnInit,Renderer2,AfterViewInit} from '@angular/core';
import {Subject} from 'rxjs'
import {debounceTime} from 'rxjs/operators'

@Component({
  selector: 'app-zoom',
  template: `
  <div class="img-zoom-container">
     <img #img  [style.height]="yet && imgHeigth?imgHeigth+'px':null"  id="myimage" [src]="imagen" (load)="onLoad()">
     <div #len [style.width]="lenSize+'px'" [style.height]="lenSize+'px'"  [style.left] ="posX+'px'" [style.top] ="posY+'px'"
class="img-zoom-lens">
</div>
</div>
  `,
  styles: [`
   .img-zoom-container {
    //  padding:20px;
    //  position: absolute;
   }

   img{
    display: inline-block;
    align-self: center;
    // left:40px;
    // max-height: auto;
    text-align: center;
    max-width: 100%;
    min-width: 99%;
    max-height: 400px;
    min-height: 400px;
    object-fit: contain;
    margin: auto;
    // padding:auto;
    // text-align: center;
    vertical-align: middle;
    position: unset;
   }

   #img:hover,  .img-zoom-lens{
     display:block;
   }

   .img-zoom-lens {
    //  display:none;
    // border-radius: 50%;
position: absolute;
width: 134px;
    height: 77px;
    background: #d3d3d37a;
    // left: 255.42px;
    // top: 226.562px;
    border: 0
   }
`]
})
export class ZoomComponent {
  public show = false;
  @Input('img') imagen: string;
  @Input() zoom=2;
  @Input() lenSize=100;
  @Input() imgWidth;
  @Input() imgHeigth;
  @Input() divZoomed:ElementRef
  
  posX:number=0;
  posY:number=0;
  cx:number=1;
  cy:number=1;
  yet:boolean=false;
  factorX:number;
  factorY:number;

  
  private mouseMovement = new Subject();

  @ViewChild('img',{ read: ElementRef }) img
  @ViewChild('len',{ read: ElementRef }) lens
  @HostListener('mousemove',['$event'])
  mouseMove(event:any)
  {
    const result=this.moveLens(event);
    this.render.setStyle(this.divZoomed,'background-position',result)
  }

  constructor(private render:Renderer2){}
  onLoad()
  {
    this.show = true;
    this.render.setStyle(this.divZoomed,'background-image',"url('" + this.imagen+ "')");
    this.render.setStyle(this.divZoomed,'background-size',(this.img.nativeElement.width * this.zoom) + "px " + (this.img.nativeElement.height * this.zoom) + "px")
    this.render.setStyle(this.divZoomed,'background-repeat', 'no-repeat')
    this.render.setStyle(this.divZoomed,'transition','background-position .2s ease-out');
    this.factorX=this.img.nativeElement.width;
    this.factorY=this.img.nativeElement.height;

     this.yet=true;
     setTimeout(()=>{
        this.factorX=this.imgWidth || this.imgHeigth?this.factorX/this.img.nativeElement.width:1
        this.factorY=this.imgWidth || this.imgHeigth?this.factorY/this.img.nativeElement.height:1
    const dim=(this.divZoomed as any).getBoundingClientRect()
    this.cx=(dim.width-this.img.nativeElement.width*this.zoom*this.factorX)/(this.img.nativeElement.width - this.lens.nativeElement.offsetWidth);
    this.cy=(dim.height-this.img.nativeElement.height*this.zoom*this.factorY)/(this.img.nativeElement.height -
     this.lens.nativeElement.offsetHeight);
         


     })


  }
  moveLens(e:any)
  {
    this.show = true;
    let pos
    let x
    let y;
    e.preventDefault();
    pos = this.getCursorPos(e);
    x = pos.x - (this.lens.nativeElement.offsetWidth / 2);
    y = pos.y - (this.lens.nativeElement.offsetHeight / 2);
    if (x > this.img.nativeElement.width - this.lens.nativeElement.offsetWidth) {x = this.img.nativeElement.width - this.lens.nativeElement.offsetWidth;}
    if (x < 0) {x = 0;}
    if (y > this.img.nativeElement.height - this.lens.nativeElement.offsetHeight) {y = this.img.nativeElement.height - this.lens.nativeElement.offsetHeight;}
    if (y < 0) {y = 0;}
    this.posX = x;
    this.posY = y;

    let result = (x * this.cx) + "px "+(y * this.cy) + "px"

    return result;


  }
  getCursorPos(e) {
    
    let a, x = 0, y = 0;
    e = e || window.event;
    a = this.img.nativeElement.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return {x : x, y : y};
  }
}
