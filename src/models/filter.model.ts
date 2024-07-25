export interface Filter {
    make: string;
    model: string;
    year: string;
    priceRange: {
      min: number;
      max: number;
    };
  }