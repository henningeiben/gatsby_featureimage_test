import React from "react"
import { Link } from "gatsby"

// import "@fontsource/montserrat-alternates"
// import "@fontsource/montserrat"
import "@fontsource/ubuntu"
import Navbar from "./navbar"

interface Props {
  location: Location
  title: string
  children?: any
}

const Layout: React.FC<Props> = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const pageNumber = location.pathname.split("/").filter(Boolean).pop()
  const isPaginatedPath = pageNumber && Boolean(pageNumber.match(/^[0-9]+$/))

  let header

  if (isRootPath || isPaginatedPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <Link className="header-link-home" to="/">
        {title}
      </Link>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">{header}</header>
      <Navbar />
      <main>{children}</main>
      <footer>
        © {new Date().getFullYear()},{" "}
        <small>
          Create with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </small>
      </footer>
    </div>
  )
}

export default Layout
