import classes from "../styles/navbar.module.css";

import Link from "next/link";
const Navbar = () => {
  return (
    <nav className={classes.nav_container}>
      <div className={classes.logo}>
        <Link href="/">NextEvents</Link>
      </div>
      <ul className={classes.container}>
        <li className={classes.navigation}>
          <Link href="/events">Browse All Events</Link>
        </li>
        <li className={classes.navigation}>
          <Link href="/auth">Login</Link>
        </li>
        <li className={classes.navigation}>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
