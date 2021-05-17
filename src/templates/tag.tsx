import React from "react"

import { Link, graphql, PageProps } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

interface DataProps {
  site: {
    siteMetadata: {
      title: string
    }
  }
  allMarkdownRemark: {
    totalCount: number
    edges: Array<{
      node: {
        fields: { slug: string }
        frontmatter: { title: string }
      }
    }>
  }
}

interface DataContext {
  tag: string
}

const TagTemplate: React.FC<PageProps<DataProps, DataContext>> = ({
  data,
  pageContext,
  location,
}) => {
  const { tag } = pageContext
  const tagHeader = `${data.allMarkdownRemark.totalCount} post${
    data.allMarkdownRemark.totalCount === 1 ? "" : "s"
  } tagged with "${tag}"`
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title={"#" + tag} description={tagHeader} />
      <div>
        <h1>{tagHeader}</h1>
        <ul>
          {data.allMarkdownRemark.edges.map(({ node }) => {
            const { slug } = node.fields
            const { title } = node.frontmatter
            return (
              <li key={slug}>
                <Link to={slug}>{title}</Link>
              </li>
            )
          })}
        </ul>
        {/*
                  This links to a page that does not yet exist.
                  You'll come back to it!
                */}
        <Link to="/tags">All tags</Link>
      </div>
    </Layout>
  )
}

export default TagTemplate

export const pageQuery = graphql`
  query tag($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
          }
        }
      }
    }
  }
`
