import React from "react"

import { Helmet } from "react-helmet"

import { graphql, PageProps } from "gatsby"
import { StaticImage, getSrc } from "gatsby-plugin-image"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks"

interface DataProps {
  site: {
    siteMetadata: {
      title: string
      siteUrl: string
      author: {
        name: string
        firstName: string
        lastname: string
        company: string
        position: string
        email: string
      }
    }
  }
  file: FileNode
}

const About: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const siteUrl = data.site.siteMetadata.siteUrl
  const author = data.site.siteMetadata.author
  const imageUrl = getSrc(data.file)

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About Me" />
      <Helmet>
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org/",
              "@type": "Person",
              "name": "${author.name}",
              "giveName":"${author.firstName}",
              "familyName":"${author.lastname}",
              "url":"${siteUrl}",
              "image":"${siteUrl}${imageUrl}"
            }
          `}
        </script>
      </Helmet>
      <div>
        <StaticImage
          style={{ float: "left", margin: "0 10px 10px 0" }}
          layout="fixed"
          placeholder="blurred"
          formats={["auto", "webp", "avif"]}
          src="../images/henning.jpg"
          alt="Profile picture"
          width={250}
          quality={95}
        />
        <p>
          Some Text
        </p>
      </div>
    </Layout>
  )
}

export default About

export const pageQuery = graphql`
  query about {
    site {
      siteMetadata {
        title
        author {
          name
          firstName
          lastName
          company
          position
          email
        }
        siteUrl
        social {
          twitter
        }
      }
    }
    file(relativePath: { eq: "henning.jpg" }) {
      childImageSharp {
        gatsbyImageData
      }
    }
  }
`
