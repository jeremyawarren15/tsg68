import FaqType from '../types/FaqType';
import client from './pocketbaseService';

export const getAllFaqs = (): Promise<FaqType[]> => {
  return client.collection("faqs").getFullList<FaqType>(undefined, {
    sort: "-title",
  })
}