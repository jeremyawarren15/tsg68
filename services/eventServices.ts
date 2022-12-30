import EventType from '../types/EventType';
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090');
export const getEvent = async (slug: string) => {
  const records = await pb.collection('events').getFullList(undefined, {
    filter: `slug = "${slug}"`
  });
  return records[0].export() as EventType;
};

export const getAllEvents = async () => {
  const events = await pb.collection('events').getFullList(undefined, {
    sort: '-date',
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
  const upcomingEvents = events.filter(post => new Date(post.date) >= new Date());
  const expiredEvents = events.filter(post => new Date(post.date) < new Date());

  return {
    upcomingEvents: sortDatesAsc(upcomingEvents),
    expiredEvents: sortDatesDesc(expiredEvents)
  };
}

const sortDatesDesc = (events:EventType[]) => {
  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

const sortDatesAsc = (events:EventType[]) => {
  return events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}