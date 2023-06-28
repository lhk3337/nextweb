import Link from "next/link";

import classes from "./button.module.css";
import React from "react";

interface Props {
  link: string;
  children: React.ReactNode;
}

function Button({ link, children }: Props) {
  return (
    <Link href={link} className={classes.btn}>
      {children}
    </Link>
  );
}

export default Button;
