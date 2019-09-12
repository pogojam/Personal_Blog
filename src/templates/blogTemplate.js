import React from "react"
import { graphql } from "gatsby"
import { Flex, Heading, Text, Card } from "rebass"
import Layout from "../components/layout"
import styled from "styled-components"

const Container = styled(Card)``

const Template = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark
  return (
    <Layout>
      <Flex
        style={{ borderBottom: "1px solid black" }}
        mb="1em"
        flexDirection="column"
        width={[1]}
      >
        <Heading fontSize="6em">{frontmatter.title}</Heading>
        <Heading p="1em" fontWeight={100} fontSize="1em">
          {frontmatter.date}
        </Heading>
      </Flex>
      <Container
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
        date
      }
    }
  }
`

export default Template
