import { getFeaturedEvents } from "../data/dummy-data";
import Itemlist from "../components/list-items";

export default function Home() {
  const featuredData = getFeaturedEvents();

  return (
    <>
      <Itemlist items={featuredData} />
    </>
  );
}
