import React from "react";
import { useRouter } from "next/router";

const EventDetail = () => {
  const router = useRouter();
  console.log(router.query);
  return <div>id{router.query.id}</div>;
};

export default EventDetail;
