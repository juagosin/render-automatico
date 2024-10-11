import { ObjectId } from "mongodb";
import { CasaRepository } from "./casa.repository.js";
import { Casa, Review } from "../casa.model.js";
import { db } from "../../mock-data.js";

const insertCasa = (casa: Casa) => {
  const _id = new ObjectId();
  const newCasa: Casa = {
    _id,
    ...casa   
  };

  db.listingsAndReviews = [...db.listingsAndReviews, newCasa];
  return newCasa;
};

const updateCasa = (casa: Casa) => {
  db.listingsAndReviews = db.listingsAndReviews.map((b) => (b._id === casa._id ? { ...b, ...casa } : b));
  return casa;
};

const insertReview = (casaId: string, review: Review)=>{
  const _id = new ObjectId();
  const newReview: Review = {
     _id,
    ...review
  };
  // Encuentra la casa con el ID proporcionado
  const casaIndex = db.listingsAndReviews.findIndex((casa) => casa._id === casaId);

  if (casaIndex !== -1) {
    // Añade la nueva revisión al campo de array de revisiones dentro de la casa
    db.listingsAndReviews[casaIndex].reviews.push(newReview);
    // Retorna la nueva revisión
    return newReview;
  } else {
    throw new Error("Casa no encontrada"); // Manejar el caso donde no se encuentra la casa
  };
}
const paginateCasaList = (
  casaList: Casa[],
  page: number,
  pageSize: number
): Casa[] => {
  let paginatedCasaList = [...casaList];
  if (page && pageSize) {
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, paginatedCasaList.length);
    paginatedCasaList = paginatedCasaList.slice(startIndex, endIndex);
}

  return paginatedCasaList;
};

export const mockRepository: CasaRepository = {
  getCasaList: async (page?: number, pageSize?: number) =>
  paginateCasaList(db.listingsAndReviews, page, pageSize),
  getCasa: async (id: string) => db.listingsAndReviews.find((b) => b._id === id),
  saveCasa: async (casa: Casa) =>
  db.listingsAndReviews.some((b) => b._id === casa._id) ? updateCasa(casa) : insertCasa(casa),
  insertReview: async (casaId: string, review: Review) => 
    db.listingsAndReviews.some((b) => b._id === casaId) ? insertReview(casaId,review) :null,
  deleteCasa: async (id: string) => {
    const exists = db.listingsAndReviews.some((b) => b._id === id);
    db.listingsAndReviews = db.listingsAndReviews.filter((b) => b._id !== id);
    return exists;
  },
};
