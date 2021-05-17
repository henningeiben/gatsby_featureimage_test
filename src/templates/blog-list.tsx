import React from "react"
import { graphql, Link, PageProps } from "gatsby"
import kebabCase from "lodash/kebabCase"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"

import * as blogListStyles from "./blog-list.module.css"
import { FileNode } from "gatsby-plugin-image/dist/src/components/hooks"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

interface DataProps {
  site: { siteMetadata: { title: string } }
  allMarkdownRemark: {
    edges: Array<{
      node: {
        excerpt: string
        frontmatter: {
          date: string
          dateIso: string
          title: string
          description: string
          tags: Array<string>
          featuredImage: FileNode
        }
        fields: { slug: string }
      }
    }>
  }
}
interface DataContext {
  limit: number
  skip: number
  numPages: number
  currentPage: number
}

const BlogListTemplate: React.FC<PageProps<DataProps, DataContext>> = ({
  data,
  pageContext,
  location,
}) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges
  const { currentPage, numPages } = pageContext
  const isFirst = currentPage === 1
  const isLast = currentPage === numPages
  const prevPage =
    currentPage - 1 === 1 ? "/" : "/" + (currentPage - 1).toString()
  const nextPage = "/" + (currentPage + 1).toString()

  return (
    /* your code to display a list of posts */
    <Layout location={location} title={siteTitle}>
      <SEO title={siteTitle} />
      <Bio />

      <ol style={{ listStyle: `none` }}>
        {posts.map(({ node: post }) => {
          const title = post.frontmatter.title || post.fields.slug
          const featuredImg = post.frontmatter.featuredImage
            ? getImage(post.frontmatter.featuredImage)
            : undefined

          return (
            <li key={post.fields.slug}>
              <article
                className="post-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <div className={blogListStyles.postListItemHeader}>
                  <header>
                    <h2>
                      <Link to={post.fields.slug} itemProp="url">
                        <span itemProp="headline">{title}</span>
                      </Link>
                    </h2>
                    <small>
                      <time
                        dateTime={post.frontmatter.dateIso}
                        itemProp="datePublished"
                      >
                        {post.frontmatter.date}
                      </time>

                      {post.frontmatter.tags ? (
                        <>
                          ;{" "}
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
                        </>
                      ) : null}
                    </small>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: post.frontmatter.description || post.excerpt,
                      }}
                      itemProp="description"
                    />
                  </section>
                </div>
                {featuredImg ? (
                  <GatsbyImage image={featuredImg} itemProp="image" alt={title} />
                ) : null}
              </article>
            </li>
          )
        })}
      </ol>

      <ul className={blogListStyles.pageLinks}>
        {!isFirst && (
          <Link to={prevPage} rel="prev">
            ← Newer
          </Link>
        )}
        {!(isFirst && isLast) &&
          Array.from({ length: numPages }, (_, i) => (
            <li
              className={blogListStyles.pageLinkItem}
              key={`pagination-number${i + 1}`}
            >
              <Link
                activeClassName={blogListStyles.activePageLinkItem}
                className={blogListStyles.pageLinkItemLink}
                to={`/${i === 0 ? "" : i + 1}`}
              >
                {i + 1}
              </Link>
            </li>
          ))}
        {!isLast && (
          <Link to={nextPage} rel="next">
            Older →
          </Link>
        )}
      </ul>
    </Layout>
  )
}

export default BlogListTemplate

export const pageQuery = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "D. MMMM YYYY", locale: "de-DE")
            dateIso: date(formatString: "YYYY-MM-DD", locale: "en-US")
            title
            description
            tags
            featuredImage {
              childImageSharp {
                gatsbyImageData(
                  height: 100
                  width: 100
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    }
  }
`
