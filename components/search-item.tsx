import React, { useState } from "react";
import { DUMMY_MONTH } from "../data/dummy-data";
import { useRouter } from "next/router";
const SearchItem = () => {
  const { year, month } = DUMMY_MONTH;
  const router = useRouter();
  const [selectedYear, setSelectedYear] = useState("2021");
  const [selectedMonth, setSelectedMonth] = useState("1");

  const handleChange =
    (setState: React.Dispatch<React.SetStateAction<string>>) => (event: React.ChangeEvent<HTMLSelectElement>) => {
      setState(event.target.value);
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/events/${selectedYear}/${selectedMonth}`);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="year">Year</label>
      <select name="" id="year" onChange={handleChange(setSelectedYear)}>
        {year.map((value, index) => (
          <option value={value} key={index}>
            {value}
          </option>
        ))}
      </select>
      <label htmlFor="month">Month</label>
      <select name="" id="month" onChange={handleChange(setSelectedMonth)}>
        {month.map((value, index) => (
          <option value={index + 1} key={index}>
            {value}
          </option>
        ))}
      </select>
      <button type="submit">Find Events</button>
    </form>
  );
};

export default SearchItem;
