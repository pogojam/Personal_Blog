import React, { useState, useEffect, useRef, forwardRef } from "react"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import Container from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import projectData from "../static/projects"
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from "react-icons/io"
import useSpace from "../components/spacer"
import { useSprings, config, animated, useSpring, useTrail } from "react-spring"
import { generateKey, useObserver, useSceanState } from "../components/util"
import useCustom from "../components/useCustom"

//SCEAN Panels

const Scean1 = ({ html, animation, ...props }, ref) => {
  return (
    <Container
      className="heading"
      style={{ height: "80vh", ...animation.slideIn(-1, 0) }}
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
      <About style={animation.scean1} mt="10vh">
        <h1>Ryan Breaux</h1>
        <animated.div style={(animation.slideIn(-1, 0), animation.expand)}>
          <Heading m="1em" style={{ fontSize: ".9em", whiteSpace: "nowrap" }}>
            {" "}
            Front-End/Back-End Developer
          </Heading>
        </animated.div>
        <animated.div style={animation.slideIn(1, 0)}>
          <Box style={{ borderTop: "1px solid black", ...animation.size }} />
        </animated.div>
        <animated.div style={(animation.slideIn(1, 0), animation.expand)}>
          <Text p="1em">
            Curious and humble , full stack developer and entrepreneur. Big on
            design and lightning fast code. Found my love for JS developing on
            Node , leveraging the power of Non-Blocking I/O and npm’s rich
            package eco system. Out of necessity I first started learning web
            development in college when I started my first business selling
            clothing online through an e-commerce website.Since I have had to
            learn more advanced techniques building tools for lead generation
            and business productivity.
          </Text>
        </animated.div>
      </About>
      <animated.div style={animation.slideIn(1, 0)}>
        <animated.div style={animation.expand}>
          <Social mt="10em" />
        </animated.div>
      </animated.div>
    </Container>
  )
}

const Scean2 = (props, ref) => {
  const anim = props.animation.slideIn(1, 3)

  return (
    <Projects
      pt="4em"
      animation={anim}
      ref={ref}
      {...props}
      className="projects"
      show={true}
    />
  )
}
const sceans = [forwardRef(Scean1), forwardRef(Scean2)]

// SCEAN INTERFACE

const Scean_Interface = ({ index, ...props }) => {
  const [ref, entries] = useObserver({
    threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
  })

  const calcXY = inr => {
    const offsetX = window.innerWidth / 2
    const offsetY = window.innerHeight / 2

    const x = offsetX - inr * offsetX
    const y = offsetY - inr * offsetY
    return [x, 0]
  }

  const [animations, set] = useSpring(() => ({
    config: config.molasses,
    expand: 1,
    opacity: 1,
    size: 0,
    transform: [0, 0],
    h1: [0, 0],
    proj: [3],
  }))

  if (entries.intersectionRatio) {
    const inr = entries.intersectionRatio
    set({
      opacity: inr,
      transform: calcXY(inr),
      size: 400 * inr,
      expand: inr,
      h1: calcXY(inr / 2),
      proj: calcXY(-inr),
    })
  }

  const setAnimation = anim => {
    const { transform, opacity, expand, proj, size } = anim
    return {
      slideIn: (skewX, skewY) => {
        return {
          transform: transform.interpolate((x, y) => {
            return `translate3d(${x}px,${y}px,0px)`
          }),
          opacity,
        }
      },
      expand: {
        transform: expand.interpolate(e => `scale(${e})`),
      },
      size: {
        maxWidth: size.interpolate(e => e + "px"),
      },
      proj: proj.interpolate(x => {
        return x
      }),
    }
  }

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
        <Scean_Interface
          setScean={props.setScean}
          key={generateKey(i)}
          index={i}
          html={html}
        />
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

const About = animated(styled(Box)`
  h2 {
    font-size: 3em;
  }
`)

const ProjectCard = ({
  logo,
  title,
  discription,
  index,
  animation,
  ...props
}) => {
  const [scean, setSean] = useCustom()
  const textRef = useRef(null)
  const [textAnimation, set] = useSpring(() => {
    return { scale: [1], opacity: [0.01], height: [0] }
  })
  const [show, toggle] = useState(false)

  const handleMouseOver = ({ clientX, clientY, ...e }) => {
    const { width, height, left, top } = textRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2

    const zone = 600

    const distance = (x1, x2, y1, y2) =>
      Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
    const dis = distance(x, clientX, y, clientY)

    if (dis < zone) {
      const area = dis / zone
      const scaledArea = 1 - area
      set({ scale: scaledArea, opacity: scaledArea, height: area })
      console.log(1 - area)
    }
    toggle(true)
  }

  return (
    <Container
      animate
      onMouseMove={handleMouseOver}
      width={[1, 1 / 3]}
      style={animation}
    >
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
      <animated.div
        ref={textRef}
        style={{
          transform: textAnimation.scale.interpolate(e => `scale(${e})`),
          opacity: textAnimation.opacity.interpolate(e => e),
        }}
      >
        <Text p="1em"> {discription}</Text>
      </animated.div>
    </Container>
  )
}

const Projects = React.forwardRef(({ animation, setScean, ...props }, ref) => {
  const trail = useTrail(projectData.length, { scale: [0], opacity: [0] })
  return (
    <Container
      animate
      flexDirection="column"
      mt="5em"
      width={[1]}
      data-sal="slide-up"
      ref={ref}
      style={animation.slideIn(1, 0)}
      {...props}
    >
      <animated.div style={animation.slideIn(-1, 0)}>
        <Heading
          style={{
            width: "40%",
            textAlign: "center",
            fontSize: "4.25rem",
            whiteSpace: "nowrap",
          }}
        >
          Projects
        </Heading>
      </animated.div>
      <animated.div>
        <Flex flexWrap="wrap">
          {trail.map(({ scale }, i) => (
            <ProjectCard
              animation={{
                transform: scale.interpolate(e => e),
              }}
              index={i}
              key={generateKey(i)}
              {...projectData[i]}
            />
          ))}
        </Flex>
      </animated.div>
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
