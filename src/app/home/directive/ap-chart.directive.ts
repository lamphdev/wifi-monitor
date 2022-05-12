import { Directive, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartNode } from 'src/app/shared/model/chart-node';

@Directive({
  selector: '[appApChart]'
})
export class ApChartDirective implements OnInit, OnChanges {

  @Input() data: ChartNode[] = [];

  deep = 0;
  mapLevel: {[key: number]: number} = {};
  memoMap: {[key: number]: number} =  {}

  constructor(private elRef: ElementRef, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.calculateData();
    setTimeout(() => {
      this.draw();
    });
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

  traveNode(data: ChartNode, deep = 1): void {
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
    if (!this.data) {
      return;
    }
    this.memoMap = {
      1: 0,
      2: 0,
      3: 0
    }
    const wrapper = this.elRef.nativeElement as HTMLElement;
    const wrapperWidth = wrapper.offsetWidth;
    const wrapperHeight = wrapper.offsetHeight;
    console.log(wrapperWidth, wrapperHeight);
    wrapper.innerHTML = '';
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


  drawNode(width: number, height: number, level: number, data: ChartNode, ctx: CanvasRenderingContext2D, joinx: number, joiny: number) {

    const r = 30;
    const padding = 20;
    const stepX = width / (this.deep + 1);
    const stepY = height / (this.mapLevel[level] + 1);

    this.memoMap = {
      ...this.memoMap,
      [level]: this.memoMap[level] + 1
    }
    const x = stepX * (level);
    const y = stepY * this.memoMap[level];

    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.strokeStyle = '#0369a1';
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.stroke();

    // draw node icon
    ctx.beginPath();
    const img = new Image();
    img.setAttribute('fill', 'green');
    img.classList.add('text-primary');
    img.onload = () => {
      ctx.drawImage(img, x - r + padding / 2, y - r + padding / 2, r * 2 - padding, r * 2 - padding);
    }
    img.src = 'assets/icons/broadcast.svg';
    ctx.stroke();

    // draw text
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.textAlign = 'center';
    ctx.strokeText(data.text, x , y + r + 10);
    ctx.stroke(); 

    // draw line
    const fromX = joinx + 5;
    const fromY = joiny;
    const toX = x - r - 5;
    const toY = y;
    if (joinx != -1 && joiny != -1) {
      this.drawConnect(fromX, fromY, toX, toY, ctx, data);
    }

    // draw children
    const children = data.children as any[];
    if (children) {
      children.forEach(child => {
        this.drawNode(width, height, level + 1, child, ctx, x + r, y)
      })
    }
  }


  drawConnect(fromX: number, fromY: number, toX: number, toY: number, ctx: CanvasRenderingContext2D, data: ChartNode): void {
    const headlen = 10;
    const breakLength = 50;

    if (fromY === toY) {
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);

      // draw connection
      ctx.beginPath();
      if (data.type === 'wifi') {
        ctx.setLineDash([5, 3]);
      }
      ctx?.moveTo(fromX, fromY);
      ctx?.lineTo(toX, toY);
      ctx?.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx?.moveTo(toX, toY);
      ctx?.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.stroke();

      // draw connect info
      const x = fromX + (toX - fromX) / 2;
      this.drawConnectInfo(x, toY, ctx, data);
    } else {
      const dx = toX - fromX;
      const dy = toY - toY;
      const angle = Math.atan2(dy, dx);

      ctx.beginPath();
      if (data.type === 'wifi') {
        ctx.setLineDash([5, 3]);
      }
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(fromX + breakLength, fromY);
      ctx.lineTo(fromX + breakLength, toY);
      ctx.lineTo(toX, toY);
      ctx.stroke();
      // ctx.setLineDash([]);

      ctx?.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
      ctx?.moveTo(toX, toY);
      ctx?.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
      ctx.stroke();

      // draw connect info 
      const x = fromX + breakLength + (toX - (fromX + breakLength)) / 2;
      this.drawConnectInfo(x, toY, ctx, data);
    }
  }

  drawConnectInfo(x: number, y: number, ctx: CanvasRenderingContext2D, data: ChartNode): void {
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.font = '13px Sans';
    ctx.strokeStyle = '#16a34a';
    ctx.strokeText(`▲: ${data.speedUp?.toFixed(2) || '--'} kbit/s`, x, y - 5);
    ctx.strokeStyle = '#0284c7';
    ctx.strokeText(`▼: ${data.speedDown?.toFixed(2) || '--'} kbit/s`, x, y + 12 +5 );
    ctx?.stroke();
  }

}
