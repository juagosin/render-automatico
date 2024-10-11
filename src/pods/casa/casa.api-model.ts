
export interface Casa {
    id: string;
    name: string;
    summary: string;
    street: string;
    reviews: Object;
  }
  export interface Review {
    id: string;
    autor: string;
    review: string;
    fecha: Date;
    
  }