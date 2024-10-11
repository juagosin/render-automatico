import { db } from '#core/servers/index.js';
import { Casa } from './casa.model.js';

export const getCasaContext = () => db?.collection<Casa>('listingsAndReviews');
