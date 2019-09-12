import React from "react"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import projectData from "../static/projects"
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from "react-icons/io"

const About = styled(Box)`
  h2 {
    font-size: 3em;
  }
`

const IndexPage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
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
        <About mt="10vh" dangerouslySetInnerHTML={{ __html: html }} />
        <Social />
      </Flex>
      <Projects />
    </Layout>
  )
}

const Social = () => {
  return (
    <div>
      <IoLogoFacebook />
      <IoLogoGithub />
      <IoLogoLinkedin />
    </div>
  )
}

const ProjectCard = ({ logo, title, discription }) => {
  return (
    <Card width={[1, 1 / 3]}>
      <Flex
        style={{ minHeight: "5em" }}
        alignItems="center"
        justifyContent="center"
        mt="3em"
      >
        <Image src={logo} />
      </Flex>
      <Heading
        style={{ whiteSpace: "nowrap", textAlign: "center" }}
        fontWeight="100"
        px="1em"
      >
        {title}
      </Heading>
      <Text p="1em"> {discription}</Text>
    </Card>
  )
}

const Projects = params => {
  return (
    <Flex flexDirection="column" mt="5em" width={[1]}>
      <Heading
        pb="1em"
        m="auto"
        style={{
          width: "40%",
          textAlign: "center",
          fontWeight: "200",
          borderBottom: "1px solid black",
        }}
      >
        Projects
      </Heading>
      <Flex flexWrap="wrap">
        {projectData.map(props => (
          <ProjectCard {...props} />
        ))}
      </Flex>
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
