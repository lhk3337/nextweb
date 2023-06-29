import React from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../data/dummy-data";
import { ItemType } from "../../types/types";
import DateIcon from "../../components/icons/date-icon";
import AddressIcon from "../../components/icons/address-icon";
import Image from "next/image";

import EventSummary from "../../components/event-detail/event-summary";
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from "../../components/event-detail/event-logistics";

const EventDetail = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const events = getEventById(id) as ItemType;
  if (!events) return;

  return (
    <div>
      <EventSummary {...events} />
      <EventLogistics {...events} />
      <EventContent>
        <p>{events.description}</p>
      </EventContent>
    </div>
  );
};

export default EventDetail;
