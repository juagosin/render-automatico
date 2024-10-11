import { ObjectId } from "mongodb";
import * as model from "#dals/index.js";
import * as apiModel from "./casa.api-model.js";

export const mapCasaFromModelToApi = (casa: model.Casa): apiModel.Casa => ({
  id: casa._id,
  name: casa.name,
  summary: casa.summary,
  street: casa.street,
  reviews: casa.reviews,
});
export const mapReviewFromModelToApi = (review: model.Review): apiModel.Review => ({
  id: review._id.toString(),
  autor: review.autor,
  review: review.review,
  fecha: review.fecha
});

export const mapReviewFromApiToModel = (review: apiModel.Review): model.Review => ({
  _id: review.id,
  autor: review.autor,
  review: review.review,
  fecha: review.fecha
 });

export const mapCasaListFromModelToApi = (
  casaList: model.Casa[]
): apiModel.Casa[] => casaList.map(mapCasaFromModelToApi);

export const mapCasaFromApiToModel = (casa: apiModel.Casa): model.Casa => ({
  _id: casa.id,
   name: casa.name,
   summary: casa.summary,
   street: casa.street,
   reviews: [],
 });
 export const mapCasaListFromApiToModel = (
    casaList: apiModel.Casa[]
    ): model.Casa[] =>
    Array.isArray(casaList) ? casaList.map(mapCasaFromApiToModel) : [];