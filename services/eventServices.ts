import EventType from '../types/EventType';
import client from './pocketbaseService';

export const getEvent = async (slug: string) => {
  const records = await client.collection('events').getFullList(undefined, {
    filter: `slug = "${slug}"`
  });
  return records[0].export() as EventType;
};

export const getAllEvents = async () => {
  const events = await client.collection('events').getFullList(undefined, {
    sort: '-start',
  })
  return events.map(event => event.export() as EventType);
};

export const getAllEventsDesc = async () => {
  return sortDatesDesc(await getAllEvents());
};

export const getAllEventsAsc = async () => {
  return sortDatesAsc(await getAllEvents());
};

export const getAllCategorizedEvents = async () => {
  const events = await getAllEvents();
  const upcomingEvents = events.filter(event => new Date(event.start) >= new Date());
  const expiredEvents = events.filter(event => new Date(event.start) < new Date());

  return {
    upcomingEvents: sortDatesAsc(upcomingEvents),
    expiredEvents: sortDatesDesc(expiredEvents)
  };
}

const sortDatesDesc = (events:EventType[]) => {
  return events.sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
}

const sortDatesAsc = (events:EventType[]) => {
  return events.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
}