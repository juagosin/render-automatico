
import {
  connectToDBServer,
} from '#core/servers/index.js';
import { envConstants } from '#core/constants/index.js';
import { getCasaContext } from '#dals/casa/casa.context.js';
import { db } from '#dals/mock-data.js';
import { Db } from 'mongodb';

export const run = async () => {
  await connectToDBServer(envConstants.MONGODB_URI);
  await getCasaContext().insertMany(db.listingsAndReviews);


  
};
