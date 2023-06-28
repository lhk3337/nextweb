import React from "react";
import { ItemType } from "../types/types";
import clasess from "./item.module.css";
import Image from "next/image";
import Button from "./button";
import ArrowRightIcon from "../components/icons/arrow-right-icon";

const Item = ({ title, location, date, image, id }: ItemType) => {
  return (
    <li>
      <Image src={`/${image}`} alt={id} width={250} height={250} />
      <span>{title}</span>
      <span>{date}</span>
      <span>{location}</span>
      <Button link={`/events/${id}`}>
        Explore Event
        <span className={clasess.icon}>
          <ArrowRightIcon />
        </span>
      </Button>
    </li>
  );
};

export default Item;
