import React from "react"
import { Flex, Box, Image, Card, Text } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import projectData from "../static/projects"

const Container = styled(Box)`
  h2 {
    font-size: 3em;
  }
`

const IndexPage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark

  console.log(data)

  return (
    <Layout>
      <SEO title="Home" />
      <Flex
        style={{ height: "100%" }}
        alignItems="center"
        flexDirection="column"
        p="2em"
        mt="auto"
        mb="auto"
      >
        <Container mt="10vh" dangerouslySetInnerHTML={{ __html: html }} />
      </Flex>
      <Projects />
    </Layout>
  )
}

const Projects = params => {
  console.log(projectData)
  return (
    <Flex mt="5em" width={[1]}>
      <h2>Projects</h2>
      <Image src={projectData[0].logo} />
    </Flex>
  )
}

export const query = graphql`
  query {
    markdownRemark {
      html
      frontmatter {
        title
      }
    }
  }
`

export default IndexPage
