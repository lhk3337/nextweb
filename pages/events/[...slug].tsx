import React from "react";
import { useRouter } from "next/router";
import { getFilteredEvents } from "../../data/dummy-data";
import Itemlist from "components/event-list/list-items";
import ErrorAlert from "components/error-alert/error-alert";
import ResultsTitle from "components/results-title/results-title";
import Button from "components/element/button";

const FilterEvent = () => {
  const router = useRouter();
  const [year, month] = (router.query.slug as string[]) || [];

  const filteredItems = getFilteredEvents({ year, month });

  if (!year && !month) return;

  if (!filteredItems || filteredItems.length === 0) {
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
      <Itemlist items={filteredItems} />
    </>
  );
};

export default FilterEvent;
