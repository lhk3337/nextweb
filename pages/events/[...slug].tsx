import { useRouter } from "next/router";
import { GetServerSidePropsContext } from "next";
import useSwr from "swr";

import Itemlist from "components/event-list/list-items";
import ErrorAlert from "components/error-alert/error-alert";
import ResultsTitle from "components/results-title/results-title";
import Button from "components/element/button";
import { getFilteredEvents } from "libs/api-util";
import { ItemType } from "types/types";
import { useEffect, useState } from "react";

interface Props {
  getfilteredItems: ItemType[];
  filterDate: {
    year: string;
    month: string;
  };
}

const FilterEvent = () => {
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();

  const fetcher = (url: string) => fetch(url).then((r) => r.json());
  const { data, isLoading } = useSwr("https://nextjs-practice-604ad-default-rtdb.firebaseio.com/events.json", fetcher);

  const [year, month] = (router.query.slug as string[]) || [];

  useEffect(() => {
    if (!data) return;
    setFilteredItems(data);
  }, [data]);

  const filteredEvents = filteredItems.filter((event: ItemType) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === parseInt(year) && eventDate.getMonth() === parseInt(month) - 1;
  });

  if (isLoading) return;
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }
  const date: Date = new Date(+year, +month - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <Itemlist items={filteredEvents} />
    </>
  );
};

export default FilterEvent;

// export const getServerSideProps = async (context: GetServerSidePropsContext) => {
//   const { params } = context;
//   const slug = params?.slug;
//   const [year, month] = slug as string[];
//   const getfilteredItems = await getFilteredEvents({ year, month });
//   return { props: { getfilteredItems, filterDate: { year, month } } };
// };
