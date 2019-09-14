import React, { useState, useEffect, useRef } from "react"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import Container from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import projectData from "../static/projects"
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from "react-icons/io"
import useSpace from "../components/spacer"
import { useSpring } from "react-spring"
import { generateKey } from "../components/util"

const About = styled(Box)`
  h2 {
    font-size: 3em;
  }
`

const useLoadScroller = classes => {
  const [list, set] = useState([])

  const intersectCallback = i => e => {
    console.log("Intersect", e, i)
    // list[i] = true
    // set(list)
  }

  const setObservers = items =>
    items.forEach((className, i) => {
      console.log(list)
      const node = document.querySelector(className)
      const options = {
        threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
      const observer = new IntersectionObserver(intersectCallback(i), options)
      observer.observe(node)
    })

  useEffect(() => {
    set(classes.map(() => false))
    setObservers(classes)
  }, [])

  return [list]
}

const IndexPage = ({ data }) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark
  const [setSpace, sizes] = useSpace()
  const [isShow] = useLoadScroller([".heading", ".projects"])
  console.log(isShow)

  const fadeIn = useSpring(isShow[0] ? { opacity: 1 } : { opacity: 0 })

  // useEffect(() => {}, [])

  return (
    <Layout>
      <SEO title="Home" />
      <Container
        className="heading"
        style={{ height: "80vh", ...fadeIn }}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        p="2em"
        mt="auto"
        mb="auto"
        animate
        type="Flex"
      >
        <About mt="10vh" dangerouslySetInnerHTML={{ __html: html }} />
        <Social />
      </Container>
      <Projects className="projects" show={isShow[1]} />
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

const Projects = ({ show, ...props }) => {
  const fadeIn = useSpring(show ? { opacity: 1 } : { opacity: 0 })

  return (
    <Container
      animate
      style={fadeIn}
      flexDirection="column"
      mt="5em"
      width={[1]}
      data-sal="slide-up"
      {...props}
    >
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
        {projectData.map((props, i) => (
          <ProjectCard key={generateKey(i)} {...props} />
        ))}
      </Flex>
    </Container>
  )
}

export const query = graphql`
  query {
    markdownRemark(frontmatter: { path: { eq: "/page/index" } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

export default IndexPage
