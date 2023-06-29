import { ItemType } from "../../types/types";
import classes from "./event-summary.module.css";

function EventSummary({ title }: ItemType) {
  return (
    <section className={classes.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;
