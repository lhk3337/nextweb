import React, { useEffect, useState } from "react";
import Itemlist from "components/event-list/list-items";
import SearchItem from "components/event-list/search-item";
import { ItemType } from "types/types";
import { getAllEvents } from "libs/api-util";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import classes from "components/profile/user-profile.module.css";
interface Props {
  allItem: ItemType[];
}

const Events = ({ allItem }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.replace("/auth");
      } else {
        setIsLoading(false);
      }
    });
  }, [router]);

  if (isLoading) {
    return <p className={classes.profile}>Loading...</p>;
  }
  return (
    <>
      <SearchItem />
      <Itemlist items={allItem} />
    </>
  );
};

export default Events;

export const getStaticProps = async () => {
  const response = await getAllEvents();
  return {
    props: {
      allItem: response,
    },
    revalidate: 60,
  };
};
