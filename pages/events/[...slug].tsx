import { useRouter } from "next/router";

import Itemlist from "components/event-list/list-items";
import ErrorAlert from "components/error-alert/error-alert";
import ResultsTitle from "components/results-title/results-title";
import Button from "components/element/button";
import { GetServerSidePropsContext } from "next";
import { getFilteredEvents } from "libs/api-util";
import { ItemType } from "types/types";

interface Props {
  getfilteredItems: ItemType[];
  filterDate: {
    year: string;
    month: string;
  };
}

const FilterEvent = ({ getfilteredItems, filterDate }: Props) => {
  const router = useRouter();

  const { year, month } = filterDate;
  if (!year && !month) return;
  if (!getfilteredItems || getfilteredItems.length === 0) {
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
      <Itemlist items={getfilteredItems} />
    </>
  );
};

export default FilterEvent;

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { params } = context;
  const slug = params?.slug;
  const [year, month] = slug as string[];
  const getfilteredItems = await getFilteredEvents({ year, month });
  return { props: { getfilteredItems, filterDate: { year, month } } };
};
