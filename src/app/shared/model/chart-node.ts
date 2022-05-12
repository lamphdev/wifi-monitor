export interface ChartNode {
    text: string;
    speedUp?: number;
    speedDown?: number;
    type?: string;
    icon?: ''
    children?: ChartNode[];
}