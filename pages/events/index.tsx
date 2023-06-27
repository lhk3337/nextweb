import React from "react";
import Itemlist from "../../components/list-items";
import { getAllEvents } from "../../data/dummy-data";
import SearchItem from "../../components/search-item";

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
