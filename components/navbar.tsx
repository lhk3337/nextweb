import classes from "../styles/navbar.module.css";
import { useSession, signOut } from "next-auth/client";
import Link from "next/link";
const Navbar = () => {
  const [session, loading] = useSession();
  function logoutHandler() {
    signOut();
  }
  return (
    <nav className={classes.nav_container}>
      <div className={classes.logo}>
        {session ? <Link href="/">NextEvents</Link> : <Link href="/auth">NextEvents</Link>}
      </div>
      <ul className={session ? classes.container : classes.loginContainer}>
        {session && (
          <li className={classes.navigation}>
            <Link href="/events">Browse All Events</Link>
          </li>
        )}
        {!session && !loading && (
          <li className={classes.navigation}>
            <Link href="/auth">Login</Link>
          </li>
        )}
        {session && (
          <li className={classes.navigation}>
            <Link href="/profile">Profile</Link>
          </li>
        )}
        {session && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
