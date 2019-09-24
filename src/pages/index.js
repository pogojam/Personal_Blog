import React, { useState, useEffect, useRef, forwardRef } from "react"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import Container from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import projectData from "../static/projects"
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from "react-icons/io"
import useSpace from "../components/spacer"
import { useSprings, useSpring } from "react-spring"
import { generateKey, useObserver } from "../components/util"

const Scean1 = ({ html, animation, ...props }, ref) => {
  console.log(animation)
  return (
    <Container
      className="heading"
      style={{ height: "80vh", ...animation }}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      p="2em"
      mt="auto"
      mb="auto"
      animate
      type="Flex"
      ref={ref}
    >
      <About mt="10vh" dangerouslySetInnerHTML={{ __html: html }} />
      <Social mt="10em" />
    </Container>
  )
}

const Scean2 = (props, ref) => {
  return <Projects ref={ref} {...props} className="projects" show={true} />
}
const sceans = [forwardRef(Scean1), forwardRef(Scean2)]

const Scean = ({ index, ...props }) => {
  const [ref, entries] = useObserver({
    threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
  })

  const calcXY = inr => {
    const x = inr * 100
    const y = 0
    console.log(x, y)
    return [x, y]
  }

  const [animations, set] = useSpring(() => ({
    opacity: 1,
    transform: [0, 0],
  }))

  if (entries.intersectionRatio) {
    const inr = entries.intersectionRatio
    set({ opacity: inr, transform: calcXY(inr) })
  }

  const setAnimation = anim => {
    const { transform, opacity } = anim
    return {
      opacity,
      transform: transform.interpolate((x, y) => {
        return `translate3d(${x}px,${y}px,0px)`
      }),
    }
  }
  console.log(entries)

  const Component = sceans[index]
  // const animation = animations[index]

  return <Component animation={setAnimation(animations)} ref={ref} {...props} />
}

const IndexPage = ({ data, ...props }) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { frontmatter, html } = markdownRemark

  return (
    <Layout>
      <SEO title="Home" />
      {sceans.map((e, i) => (
        <Scean key={generateKey(i)} index={i} html={html} />
      ))}
    </Layout>
  )
}

const Social = props => {
  return (
    <Box {...props}>
      <IoLogoFacebook />
      <IoLogoGithub />
      <IoLogoLinkedin />
    </Box>
  )
}

const About = styled(Box)`
  h2 {
    font-size: 3em;
  }
`

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

const Projects = React.forwardRef(({ animation, ...props }, ref) => {
  return (
    <Container
      animate
      flexDirection="column"
      mt="5em"
      width={[1]}
      data-sal="slide-up"
      ref={ref}
      style={animation}
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
})

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
