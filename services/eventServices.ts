import EventType from '../types/EventType';
import getClient from '../services/contentfulService';

export const getEvent = async (id: string) => {
  const client = getClient();

  const { items } = await client.getEntries<EventType>({
    content_type: "events",
    "sys.id": id
  });

  if (items.length < 1) return null;

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
  return sortDatesDesc(await getAllEvents());
};

export const getAllEventsAsc = async () => {
  return sortDatesAsc(await getAllEvents());
};

export const getAllCategorizedEvents = async () => {
  const events = await getAllEvents();
  const upcomingEvents = events.filter(post => new Date(post.eventDate) >= new Date());
  const expiredEvents = events.filter(post => new Date(post.eventDate) < new Date());

  return {
    upcomingEvents: sortDatesAsc(upcomingEvents),
    expiredEvents: sortDatesDesc(expiredEvents)
  };
}

const sortDatesDesc = (events:EventType[]) => {
  return events.sort((a, b) => new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime());
}

const sortDatesAsc = (events:EventType[]) => {
  return events.sort((a, b) => new Date(a.eventDate).getTime() - new Date(b.eventDate).getTime());
}