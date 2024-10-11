
import { ObjectId } from "mongodb";
export interface Casa {
    _id: string;
    name: string;
    summary: string;
    street: string;
    reviews: Review[];
  }
  export interface Review {
    _id: string;
    autor: string;
    review: string;
    fecha: Date;

  }