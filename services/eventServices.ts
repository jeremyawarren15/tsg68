import EventType from '../types/EventType';
import client from './pocketbaseService';
import { format } from 'small-date';

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

// this is offset by one day so events are still visible
// for the day of the event
export const getUpcomingEvents = async () => {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayText = format(new Date(yesterday), 'yyyy-MM-dd')
  const events = await client.collection('events').getFullList(undefined, {
    filter: `start >= "${yesterdayText} 00:00:00"`,
    sort: '-start',
  })
  return events.map(event => event.export() as EventType);
}

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

export const getAttending = async (slug: string) => {
  return await client.send(`/events/${slug}/attending`, {
    method: "GET"
  })
}

export const getCurrentUsersResponse = async (slug: string) => {
  return await client.send(`/events/${slug}/response`, {
    method: "GET"
  })
}