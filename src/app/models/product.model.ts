export interface IProduct {
    id: number;
    name: string;
    rate: number;
    totalRate: number;
    price: number;
    discountPercent?: number;
    image: string;
}