import { Link } from "gatsby"
import React from "react"

import * as navbarStyles from "./navbar.module.css"

const Navbar = () => {
  return (
    <nav className={navbarStyles.navBar}>
      <ul className={navbarStyles.navList}>
        <li>
          <Link className={navbarStyles.navItem} activeClassName={navbarStyles.activeNavItem} to="/about">About</Link>
        </li>
        <li>
          <Link className={navbarStyles.navItem} activeClassName={navbarStyles.activeNavItem} to="/tags">Tags</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
