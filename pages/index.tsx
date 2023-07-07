import { getFeaturedEvents } from "libs/api-util";
import Itemlist from "components/event-list/list-items";
import { ItemType } from "types/types";
import NewsletterRegistration from "components/input/newsletter-registration";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";
import classes from "components/profile/user-profile.module.css";
interface Props {
  featuredData: ItemType[];
}

export default function Home({ featuredData }: Props) {
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
      <NewsletterRegistration />
      <Itemlist items={featuredData} />
    </>
  );
}

export const getStaticProps = async () => {
  const response = await getFeaturedEvents();
  return {
    props: {
      featuredData: response,
    },
  };
};
