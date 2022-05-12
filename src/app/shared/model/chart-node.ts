export interface ChartNode {
    text: string;
    speedUp?: number;
    speedDown?: number;
    type?: 'wifi'|'ethernet'
    icon?: ''
    children?: ChartNode[];
}