import React from "react"
import Layout from "../components/layout"
import { navigate } from "@reach/router"
import { Flex, Card, Heading, Text, Image } from "rebass"

const BlogCard = ({ frontmatter }) => {
  const { title, path, poster, caption } = frontmatter
  return (
    <Card
      pl="50%"
      width={[1]}
      style={{
        background: `url(${poster})`,
        backgroundSize: "cover",
        position: "relative",
        borderRadius: "3px",
      }}
      onClick={() => navigate(path)}
    >
      <Card borderRadius="3px" p="1em" color="white" bg="black">
        <Heading fontSize="3em">{title}</Heading>
        <Text m=".5em">{caption}</Text>
      </Card>
    </Card>
  )
}

const Blog = ({ data: { allMarkdownRemark } }) => {
  const { edges } = allMarkdownRemark

  console.log(edges)

  return (
    <Layout>
      <Card my="6em" />
      {edges.map(({ node }) => (
        <BlogCard {...node} />
      ))}
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { frontmatter: { path: { regex: "/blog/" } } }
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          frontmatter {
            path
            title
            date
            caption
            poster
          }
        }
      }
    }
  }
`

export default Blog
