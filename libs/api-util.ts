import { ItemType } from "types/types";

interface filteredEventsTyle {
  [key: string]: string;
}

export async function getAllEvents() {
  const response = await (await fetch("https://nextjs-practice-604ad-default-rtdb.firebaseio.com/events.json")).json();
  return response;
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event: ItemType) => event.isFeatured);
}

export async function getEventById(id: string) {
  const allEvents = await getAllEvents();
  return allEvents.find((event: ItemType) => event.id === id);
}

export async function getFilteredEvents(dateFilter: filteredEventsTyle) {
  const allEvents = await getAllEvents();
  const { year, month } = dateFilter;

  let filteredEvents = allEvents.filter((event: ItemType) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === parseInt(year) && eventDate.getMonth() === parseInt(month) - 1;
  });
  return filteredEvents;
}
