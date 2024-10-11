import { ObjectId } from "mongodb";
import { CasaRepository } from "./casa.repository.js";
import { Casa, Review } from "../casa.model.js";
import { getCasaContext } from '../casa.context.js';

export const dbRepository: CasaRepository = {
  getCasaList: async (page?: number, pageSize?: number) => {
    const skip = Boolean(page) ? (page - 1) * pageSize : 0;
    const limit = pageSize ?? 0;
    return await getCasaContext()
    .find()
    .skip(skip)
    .limit(limit)
    .toArray();
  },
  getCasa: async (id: string) => {
    return await getCasaContext().findOne({
         _id: id,
       });
  },
  saveCasa: async (casa: Casa) => {
    return await getCasaContext().findOneAndUpdate(
      {
        _id: casa._id,
      },
      { $set: casa },
      { upsert: true, returnDocument: 'after' }
    );
  },
  insertReview: async (casaId: string,review: Review) => {
    const {acknowledged} =  await getCasaContext().updateOne(
      {
        _id: casaId,
      },{
        $push: {
          reviews: review
        }
      }      
    );
    return acknowledged ? review : null;
  },
  deleteCasa: async (id: string) => {
    throw new Error("Not implemented");
  },
};
