import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Itemlist from "components/event-list/list-items";
import ErrorAlert from "components/error-alert/error-alert";
import ResultsTitle from "components/results-title/results-title";
import Button from "components/element/button";
import { GetServerSidePropsContext } from "next";
import { getFilteredEvents } from "libs/api-util";

interface Props {
  slug: string[];
}

const FilterEvent = ({ slug }: Props) => {
  const router = useRouter();
  const [filteredItems, setFilteredItems] = useState([]);
  const [year, month] = slug;

  useEffect(() => {
    const fetchDate = async () => {
      const getfilteredItems = await getFilteredEvents({ year, month });
      setFilteredItems(getfilteredItems);
    };
    fetchDate();
  }, [year, month]);

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const slug = context.params?.slug;
  return { props: { slug } };
};
