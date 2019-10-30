import React from "react"
import Layout from "../components/layout"
import { navigate } from "@reach/router"
import { Flex, Box, Card, Heading, Text, Image } from "rebass"

const data = {
  img:
    "https://res.cloudinary.com/dxjse9tsv/image/upload/v1555699972/architecture_white_room.jpg",
  title: "Tidbits ",
  caption: "",
}

const Hero = ({ title, caption, img }) => {
  return (
    <Box
      style={{
        minHeight: "40vh",
        position: "relative",
        background: `url(${img})`,
      }}
    >
      <Heading
        style={{ position: "absolute", bottom: "50%" }}
        fontSize="3em"
        color="black"
        opacity="1"
      >
        {title}
      </Heading>
      <Text>{caption}</Text>
    </Box>
  )
}

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

  return (
    <Layout navAnim={false} my="6em">
      <Hero img={data.img} title={data.title} caption={data.caption} />
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
