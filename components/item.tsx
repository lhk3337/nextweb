import React from "react";
import { ItemType } from "../types/types";
import Link from "next/link";

const Item = ({ title, description, location, date, image, id }: ItemType) => {
  return (
    <li>
      <span>{title}</span>
      <span>{description}</span>
      <Link href={`/events/${id}`}>이동</Link>
    </li>
  );
};

export default Item;
