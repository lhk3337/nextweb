import React from "react";
import Itemlist from "components/event-list/list-items";
import SearchItem from "components/event-list/search-item";
import { ItemType } from "types/types";
import { getAllEvents } from "libs/api-util";

interface Props {
  allItem: ItemType[];
}

const Events = ({ allItem }: Props) => {
  return (
    <>
      <SearchItem />
      <Itemlist items={allItem} />
    </>
  );
};

export default Events;

export const getStaticProps = async () => {
  const response = await getAllEvents();
  return {
    props: {
      allItem: response,
    },
    revalidate: 60,
  };
};
