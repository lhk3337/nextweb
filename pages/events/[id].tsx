import React from "react";
import { ItemType } from "types/types";

import EventSummary from "components/event-detail/event-summary";
import EventContent from "components/event-detail/event-content";
import EventLogistics from "components/event-detail/event-logistics";
import { getAllEvents, getEventById } from "libs/api-util";
import { GetStaticPropsContext } from "next";
import Comments from "components/input/comments";
interface Props {
  events: ItemType;
}
const EventDetail = ({ events }: Props) => {
  if (!events) return;

  return (
    <div>
      <EventSummary {...events} />
      <EventLogistics {...events} />
      <EventContent>
        <p>{events.description}</p>
      </EventContent>
      <div>
        <Comments eventId={events.id} />
      </div>
    </div>
  );
};

export default EventDetail;

export async function getStaticPaths() {
  const res = await getAllEvents();
  const paths = res.map((event: ItemType) => ({ params: { id: event.id } }));
  return {
    paths,
    fallback: "blocking",
  };
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params?.id as string;
  const response = await getEventById(id);
  return { props: { events: response } };
};
