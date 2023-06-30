import React from "react";
import { ItemType } from "../../types/types";
import classes from "./item.module.css";
import Image from "next/image";
import Button from "components/element/button";

import ArrowRightIcon from "../icons/arrow-right-icon";
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon";

const Item = ({ title, location, date, image, id }: ItemType) => {
  const fetchedDate = new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" });
  const fetchedLocation = location.trim().split(", ");

  return (
    <li className={classes.item}>
      <Image src={`/${image}`} alt={id} width="0" height="0" sizes="100vw" className={classes.thumbnail} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{fetchedDate}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <div>
              {fetchedLocation.map((value, index) => (
                <address key={index}>{value}</address>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={`/events/${id}`}>
            Explore Event
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default Item;
