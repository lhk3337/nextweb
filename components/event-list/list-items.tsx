import React from "react";
import classes from "./list-items.module.css";
import { ItemType } from "../../types/types";
import Item from "./item";
interface Props {
  items: ItemType[];
}

const Itemlist = ({ items }: Props) => {
  return (
    <div className={classes.main_container}>
      <ul className={classes.lists}>
        {items.map((value) => (
          <Item {...value} key={value.id} />
        ))}
      </ul>
    </div>
  );
};

export default Itemlist;
