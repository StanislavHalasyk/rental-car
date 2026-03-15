"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import css from "./Header.module.css";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className={css.header}>
      <div className={css.container}>
        <Link href="/" className={css.logo}>
          Rental<span style={{ color: "#3470ff" }}>Car</span>
        </Link>

        <nav className={css.nav}>
          <Link
            href="/"
            className={`${css.link} ${pathname === "/" ? css.active : ""}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`${css.link} ${pathname === "/catalog" ? css.active : ""}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
