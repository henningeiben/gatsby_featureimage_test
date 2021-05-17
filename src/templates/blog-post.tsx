import React from "react"
import { Link, graphql, PageProps } from "gatsby"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks"

import kebabCase from "lodash/kebabCase"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

interface DataProps {
  markdownRemark: {
    id: string
    excerpt: string
    html: string
    frontmatter: {
      title: string
      date: string
      dateIso: string
      description: string
      tags: Array<string>
      featuredImage?: FileNode
    }
  }
  site: {
    siteMetadata: {
      title: string
    }
  }
  next: any
  previous: any
}

const BlogPostTemplate: React.FC<PageProps<DataProps>> = ({
  data,
  location,
}) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data
  const featuredImg = post.frontmatter.featuredImage
    ? getImage(post.frontmatter.featuredImage)
    : undefined

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        image={featuredImg}
        keywords={post.frontmatter.tags}
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          {featuredImg ? (
            <GatsbyImage image={featuredImg} itemProp="image" alt="" />
          ) : null}
          <p>
            <time dateTime={post.frontmatter.dateIso} itemProp="datePublished">
              {post.frontmatter.date}
            </time>
            {post.frontmatter.tags ? (
              <small>
                <br />
                <span itemProp="keywords">
                  {post.frontmatter.tags
                    .map<React.ReactNode>(item => (
                      <Link
                        className="tag"
                        key={item}
                        to={`/tags/${kebabCase(item)}/`}
                      >
                        {item}
                      </Link>
                    ))
                    .reduce((prev, curr) => [prev, ", ", curr])}
                </span>
              </small>
            ) : null}
          </p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "D. MMMM YYYY", locale: "de-DE")
        dateIso: date(formatString: "YYYY-MM-DD", locale: "en-US")
        description
        tags
        featuredImage {
          childImageSharp {
            gatsbyImageData(
              width: 400
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
