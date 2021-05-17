/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio: React.FC = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <Link to="/about">
        <StaticImage
          className="bio-avatar"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/henning.jpg"
          width={50}
          height={50}
          quality={95}
          alt="Profile picture"
        />
      </Link>
      {author?.name && (
        <p itemProp="author" itemScope itemType="https://schema.org/Person">
          Created by{" "}
          <Link rel="author" to="/about">
            <strong itemProp="name">{author.name}</strong>
          </Link>{" "}
          {author?.summary || null}
          {` `}
          <a href={`https://twitter.com/${social?.twitter || ``}`}>
            Follow me!
          </a>
        </p>
      )}
    </div>
  )
}

export default Bio
