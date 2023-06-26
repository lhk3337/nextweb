import classes from "../styles/navbar.module.css";

import Link from "next/link";
const Navbar = () => {
  return (
    <nav className={classes.nav_container}>
      <ul className={classes.container}>
        <li className={classes.logo}>
          <Link href="/">NextEvents</Link>
        </li>
        <li className={classes.navigation}>
          <Link href="/events">Browse All Events</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
