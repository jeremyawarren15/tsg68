import EventType from '../types/EventType';
import getClient from '../services/contentfulService';

export const getEvent = async (id: string) => {
  const client = getClient();

  const { items } = await client.getEntries<EventType>({
    content_type: "events",
    "sys.id": id
  });
  console.log(items)

  return items[0].fields;
};

export const getAllEvents = async () => {
  const client = getClient();

  const { items } = await client.getEntries<EventType>({content_type: "events"});
  console.log(items)

  return items.map((item) => {
    const id = item.sys.id;
    const event = {...item.fields};
    event.id=id;
    return event;
  });
};

export const getAllEventsDesc = async () => {
  const events = await getAllEvents()
  return events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
};

export const getAllEventsAsc = async () => {
  const events = await getAllEvents()
  return events.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
};