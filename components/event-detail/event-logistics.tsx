import AddressIcon from "../icons/address-icon";
import DateIcon from "../icons/date-icon";
import LogisticsItem from "./logistics-item";
import classes from "./event-logistics.module.css";
import Image from "next/image";
import { ItemType } from "types/types";

function EventLogistics({ title, location, date, image, id }: ItemType) {
  const fetchedDate = new Date(date).toLocaleDateString("en-US", { month: "long", year: "numeric", day: "numeric" });
  const fetchedLocation = location.trim().split(", ");

  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        <Image src={`/${image}`} alt={id} width="0" height="0" sizes="100vw" className={classes.thumbnail} />
      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{fetchedDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <div>
            {fetchedLocation.map((value, index) => (
              <address key={index}>{value}</address>
            ))}
          </div>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
