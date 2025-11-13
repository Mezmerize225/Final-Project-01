export interface IProduct {
    id: string;
    title: string;
    rate: number;
    totalRate: number;
    price: number;
    discountPercent?: number;
    image: string;
    newPrice: number;
}