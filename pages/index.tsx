import { getFeaturedEvents } from "libs/api-util";
import Itemlist from "components/event-list/list-items";
import { ItemType } from "types/types";
import Input from "components/input";

interface Props {
  featuredData: ItemType[];
}

export default function Home({ featuredData }: Props) {
  return (
    <>
      <Input />
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
