import { Directive, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appApChart]'
})
export class ApChartDirective implements OnInit, OnChanges {

  @Input() data: any[] = [];

  deep = 0;
  mapLevel: {[key: number]: number} = {};
  memoMap: {[key: number]: number} =  {}

  constructor(private elRef: ElementRef, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.calculateData();
    setTimeout(() => {
      this.draw();
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.draw();
    }
  }

  calculateData(): void {
    this.deep = 0;
    this.mapLevel = {};
    this.data.forEach(data => this.traveNode(data));
  }

  traveNode(data: any, deep = 1): void {
    if (this.mapLevel[deep]) {
      this.mapLevel = {
        ...this.mapLevel,
        [deep]: this.mapLevel[deep] + 1
      }
    } else {
      this.mapLevel = {
        ...this.mapLevel,
        [deep]: 1
      }
    }
    if (deep > this.deep) {
      this.deep = deep;
    }
    if (data.children) {
      (data.children as any[]).forEach(child => this.traveNode(child, deep + 1) )
    }
  }

  draw() {
    this.memoMap = {
      1: 0,
      2: 0,
      3: 0
    }
    const wrapper = this.elRef.nativeElement as HTMLElement;
    const wrapperWidth = wrapper.offsetWidth;
    const wrapperHeight = wrapper.offsetHeight;
    const canvas = document.createElement('canvas');
    wrapper.appendChild(canvas);
    canvas.setAttribute('width', `${wrapperWidth}`);
    canvas.setAttribute('height', `${wrapperHeight}`);
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.data.forEach(item => {
        this.drawNode(wrapperWidth, wrapperHeight, 1, item, ctx, -1, -1);
      })
    }
  }


  drawNode(width: number, height: number, level: number, data: any, ctx: CanvasRenderingContext2D, joinx: number, joiny: number) {

    const r = 30;
    const stepX = width / (this.deep + 1);
    const stepY = height / (this.mapLevel[level] + 1);

    this.memoMap = {
      ...this.memoMap,
      [level]: this.memoMap[level] + 1
    }
    const x = stepX * (level);
    const y = stepY * this.memoMap[level];

    ctx.beginPath();
    ctx.strokeStyle = '#0369a1';
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeText(data.text, x - r / 2, y + r + 10);
    ctx.stroke(); 

    // draw line
    const fromX = joinx + 5;
    const fromY = joiny;
    const toX = x - r - 5;
    const toY = y;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    const headlen = 10;
    if (joinx != -1 && joiny != -1) {
      ctx?.beginPath();
      ctx?.moveTo(fromX, fromY);
      ctx?.lineTo(toX, toY);
      ctx?.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx?.moveTo(toX, toY);
      ctx?.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx?.stroke();
    }

    const children = data.children as any[];
    if (children) {
      children.forEach(child => {
        this.drawNode(width, height, level + 1, child, ctx, x + r, y)
      })
    }
  }

}
