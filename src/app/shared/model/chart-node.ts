export interface ChartNode {
    text: string;
    speedUp?: number;
    speedDown?: number;
    type?: string;
    mac_address?: string;
    icon?: ''
    children?: ChartNode[];
}