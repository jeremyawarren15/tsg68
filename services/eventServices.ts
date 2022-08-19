import EventType from '../types/EventType';
import getClient from '../services/contentfulService';

export const getEvent = async (slug: string) => {
  const client = getClient();

  const { items } = await client.getEntries<EventType>({
    content_type: "events",
    'fields.slug': slug
  });

  return items[0].fields;
};

export const getAllEvents = async () => {
  const client = getClient();

  const { items } = await client.getEntries<EventType>({content_type: "events"});

  return items.map((item) => item.fields);
};

export const getAllEventsDesc = async () => {
  const events = await getAllEvents()
  return events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
};

export const getAllEventsAsc = async () => {
  const events = await getAllEvents()
  return events.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
};