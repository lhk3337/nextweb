import React from "react";
import Itemlist from "components/event-list/list-items";
import { getAllEvents } from "data/dummy-data";
import SearchItem from "components/event-list/search-item";

const Events = () => {
  const allItem = getAllEvents();

  return (
    <>
      <SearchItem />
      <Itemlist items={allItem} />
    </>
  );
};

export default Events;
