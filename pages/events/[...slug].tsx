import React from "react";
import { useRouter } from "next/router";
const FilterEvent = () => {
  const router = useRouter();

  return <div>{router.query.slug}</div>;
};

export default FilterEvent;
