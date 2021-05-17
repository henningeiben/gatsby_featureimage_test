import { PageProps } from "gatsby"
import React from "react"

// Utilities
import kebabCase from "lodash/kebabCase"
// Components
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

interface DataProps {
  site: { siteMetadata: { title: string } }
  allMarkdownRemark: {
    group: Array<{
      fieldValue: string
      totalCount: number
    }>
  }
}

const Tags: React.FC<PageProps<DataProps>> = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Alle Tags" />
      <div>
        <h1>Tags</h1>
        <ul>
          {data.allMarkdownRemark.group.map(tag => (
            <li key={tag.fieldValue}>
              <Link to={`/tags/${kebabCase(tag.fieldValue)}/`}>
                {tag.fieldValue} ({tag.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  )
}

export default Tags

export const pageQuery = graphql`
  query alltags {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(limit: 2000) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`
