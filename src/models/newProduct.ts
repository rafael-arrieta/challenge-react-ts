export interface NewProduct {
    make: string;
    model: string;
    description: string;
    price: number;
    year: number;
    type: string;
    images: string[];
    booking: boolean;
    onDestroy: boolean;
}