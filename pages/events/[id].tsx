import React from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../data/dummy-data";
import { ItemType } from "../../types/types";
import DateIcon from "../../components/icons/date-icon";
import AddressIcon from "../../components/icons/address-icon";
import Image from "next/image";

const EventDetail = () => {
  const router = useRouter();
  const id = router.query.id as string;
  const events = getEventById(id) as ItemType;

  return (
    <div>
      <h1>{events?.title}</h1>
      <Image src={`/${events?.image}`} alt={events?.id} width={400} height={400} priority />
      <DateIcon />
      <div>{events?.date}</div>
      <AddressIcon />
      <div>{events?.location}</div>
      <span>{events?.description}</span>
    </div>
  );
};

export default EventDetail;
