import { createClient } from 'contentful';
import { EventType } from '../types/EventType';
import matter from 'gray-matter';

const getClient = () => {
  return createClient({
    space: process.env.CONTENTFUL_SPACE_ID as string,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string
  });
}

type MapFieldsType = {
  fields: EventType
}

const mapFields = ({fields: {title, description, body, publishDate, eventDate, slug}}: MapFieldsType) => {
  return {
    title,
    publishDate,
    eventDate,
    slug,
    description: matter(description).content,
    body: matter(body).content,
  }
}

export const getEvent = async (slug: string) => {
  const client = getClient();

  const { items } = await client.getEntries<EventType>({
    content_type: "events",
    'fields.slug': slug
  });

  return items.map(mapFields)[0];
};

export const getAllEvents = async () => {
  const client = getClient();

  const { items } = await client.getEntries<EventType>({content_type: "events"});
  const events = items.map(mapFields);

  return events;
};

export const getAllEventsDesc = async () => {
  const events = await getAllEvents()
  return events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
};

export const getAllEventsAsc = async () => {
  const events = await getAllEvents()
  return events.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
};