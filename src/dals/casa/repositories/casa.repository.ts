import { Casa, Review } from "../casa.model.js";

export interface CasaRepository {
  getCasaList: (page?: number, pageSize?: number) => Promise<Casa[]>;
  getCasa: (id: string) => Promise<Casa>;
  saveCasa: (casa: Casa) => Promise<Casa>;
  insertReview: (casaId: string, review: Review) => Promise<Review>;
  deleteCasa: (id: string) => Promise<boolean>;
}
