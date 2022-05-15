import { Directive, ElementRef, Input, NgZone, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartNode } from 'src/app/shared/model/chart-node';

@Directive({
  selector: '[appApChart]'
})
export class ApChartDirective implements OnInit, OnChanges {

  @Input() data: ChartNode[] = [];

  readonly r = 30;
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
    this.memoMap = {};
    for (let i = 1; i <= this.deep; i ++) {
      this.memoMap = {
        ...this.memoMap,
        [i]: 0
      }
    }
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
      data.children.forEach(child => this.traveNode(child, deep + 1) )
    }
  }

  draw() {
    if (this.data.length === 0) {
      return;
    }
    this.calculateData();
    const wrapper = this.elRef.nativeElement as HTMLElement;
    const wrapperWidth = wrapper.offsetWidth;
    const wrapperHeight = wrapper.offsetHeight;

    const minWith = (this.deep + 1) * 250 + (this.r * 2 * this.deep);
    const maxByLevel = Object.keys(this.mapLevel).reduce((result, item) => {
      if (this.mapLevel[Number(item)] >result) {
        return this.mapLevel[Number(item)];
      }
      return result;
    }, 0);
    const minHeight = (maxByLevel) * this.r * 2 + (maxByLevel + 1) * 50;
    const canvasWith = Math.max(wrapperWidth, minWith);
    const canvasHeight = Math.max(wrapperHeight, minHeight);
    wrapper.style.height = `${canvasHeight}px`;

    wrapper.innerHTML = '';
    const canvas = document.createElement('canvas');  
    wrapper.appendChild(canvas);
    canvas.setAttribute('width', `${canvasWith}`);
    canvas.setAttribute('height', `${canvasHeight}`);
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.data.forEach(item => {
        this.drawNode(canvasWith, canvasHeight, 1, item, ctx, -1, -1);
      })
    }
  }


  drawNode(width: number, height: number, level: number, data: ChartNode, ctx: CanvasRenderingContext2D, joinx: number, joiny: number) {
    const r = this.r;
    const padding = 20;
    const stepX = width / (this.deep + 1);
    const stepY = height / (this.mapLevel[level] + 1);

    this.memoMap = {
      ...this.memoMap,
      [level]: this.memoMap[level] + 1
    }
    const x = stepX * (level);
    let y = stepY * this.memoMap[level];
    // handle level
    const mapByLevel = this.mapLevel;
    if (level >= 4) {
      y = joiny;
    }

    ctx.beginPath();
    ctx.imageSmoothingEnabled = true;
    (ctx as any).webkitImageSmoothingEnabled = false;
    (ctx as any).mozImageSmoothingEnabled = false;
    (ctx as any).imageSmoothingEnabled = false;
    ctx.setLineDash([]);
    ctx.strokeStyle = '#f43f5e';
    ctx.fillStyle = '#f43f5e';
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();

    // draw node icon
    ctx.beginPath();
    const img = new Image();

    img.onload = () => {
      ctx.drawImage(img, x - r + padding / 2, y - r + padding / 2, r * 2 - padding, r * 2 - padding);
    }
    img.src = 'assets/icons/chart-icon.svg';
    ctx.stroke();

    // draw text
    const fontSize = 14;
    ctx.beginPath();
    ctx.setLineDash([]);
    ctx.font = `${fontSize}px Roboto Slab`;
    ctx.textAlign = 'center';
    ctx.fillText(data.text, x , y + r + fontSize + 2);
    if (level !== 1) { // Level  = 1 (Internet) not have mac address
      ctx.fillText(data.mac_address || '--', x, y + r + fontSize * 2 + 2);
    }
    ctx.stroke(); 

    // draw line
    if (joinx != -1 && joiny != -1) {
      const fromX = joinx + 5;
      const fromY = joiny;
      const toX = x - r - 5;
      const toY = y;
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
      if (data.type?.startsWith('wi_fi')) {
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
      if (data.type?.startsWith('wi_fi')) {
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
    // ctx.beginPath();
    // ctx.setLineDash([]);
    // ctx.font = '15px Sans';
    // ctx.strokeStyle = '#0284c7';
    // ctx.strokeText(`▲: ${data.speedUp?.toFixed(2) || '--'} kbit/s`, x, y - 5);
    // ctx.strokeStyle = '#16a34a';
    // ctx.strokeText(`▼: ${data.speedDown?.toFixed(2) || '--'} kbit/s`, x, y + 15 + 2);
    // ctx.stroke();

    // ctx.setLineDash([]);
    // if (data.type?.startsWith('wifi')){
    //   const iconSize = 13;
    //   // draw icon wifi
    //   ctx.beginPath();
    //   const icon = `/assets/icons/${data.type === 'wifi5' ? 'wifi5.svg' : 'wifi2_4.svg'}`;
    //   const image = new Image();
    //   image.onload = () => {
    //     ctx.drawImage(image, x, y - iconSize - 5, iconSize, iconSize);
    //   }
    //   image.src = icon;
    //   ctx?.stroke();

      // draw type wifi
      // ctx.beginPath();
      // const text = data.type === 'wifi5' ? '5G' : '2.4G';
      // ctx.textAlign = 'left';
      // ctx.strokeStyle = data.type === 'wifi5' ? '#16a34a' : '#d97706';
      // ctx.strokeText(text, x + iconSize + 2, y - 5);
      // ctx.stroke();
    //}
  }

}
