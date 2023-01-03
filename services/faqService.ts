import FaqType from '../types/FaqType';

export const getFaq = async (slug: string): Promise<FaqType> => {
  const client = getClient();

  const { items } = await client.getEntries<FaqType>({
    content_type: "faq",
    'fields.slug': slug
  });

  return items[0].fields;
};

export const getAllFaqs = async (): Promise<FaqType[]> => {
  const client = getClient();

  const { items } = await client.getEntries<FaqType>({content_type: "faq"});

  return items.map((faq) => faq.fields);
};
