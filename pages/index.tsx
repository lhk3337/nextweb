import { getFeaturedEvents } from "libs/api-util";
import Itemlist from "components/event-list/list-items";
import { ItemType } from "types/types";

interface Props {
  featuredData: ItemType[];
}

export default function Home({ featuredData }: Props) {
  return (
    <>
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
