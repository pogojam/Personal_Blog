import React, { useState, useEffect, useRef, forwardRef, Children } from "react"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import Container from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import projectData from "../static/projects"
import _ from "lodash"
import useSpace from "../components/spacer"
import {
  useSprings,
  useTransition,
  config,
  animated,
  useSpring,
  useTrail,
} from "react-spring"
import { generateKey, useObserver, useSceanState } from "../components/util"
import { Social, Button } from "../components/elements"
import useCustom from "../components/useCustom"

//SCEAN Panels

const Scean1 = ({ html, animation, ...props }, ref) => {
  return (
    <Container
      className="heading"
      style={{
        height: "80vh",
        ...animation.fadeIn(7),
        ...animation.slideIn(0),
      }}
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
      <About mt="10vh">
        <animated.div style={animation.slideIn(-1)}>
          <h1>Ryan Breaux</h1>
        </animated.div>
        <animated.div style={(animation.slideIn(1), animation.rotate)}>
          <Heading m="1em" style={{ fontSize: ".9em", whiteSpace: "nowrap" }}>
            {" "}
            Front-End/Back-End Developer
          </Heading>
        </animated.div>
        <animated.div
          style={{ ...animation.fadeIn(14), ...animation.size([0, 30, "vw"]) }}
        >
          <Box style={{ borderTop: "1px solid black" }} />
        </animated.div>
        <animated.div style={(animation.slideIn(1, 0), animation.rotate)}>
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
      <animated.div style={animation.slideIn()}>
        <animated.div style={animation.expand}>
          <Social linkedin github size="1.3em" mt="10em" />
        </animated.div>
      </animated.div>
    </Container>
  )
}

const Scean2 = (props, ref) => {
  return (
    <Projects pt="4em" ref={ref} {...props} className="projects" show={true} />
  )
}

const Scean3 = ({ animation }, ref) => {
  const choices = [
    {
      text: "Desktop",
    },
    {
      text: "Mobile",
    },
    {
      text: "DevOps",
    },
  ]
  const [form, showForm] = useState()
  const [isActive, setButton] = useState([false, false, false])
  const transition = useTransition(form, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const handleClick = i => e => {
    setButton(prevArr => {
      prevArr[i] = !prevArr[i]
      return [...prevArr]
    })
    showForm(true)
  }

  return (
    <Container
      type="Flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      p="5em"
      style={{
        minHeight: "90vh",
        position: "relative",
        ...animation.fadeIn(1),
      }}
      ref={ref}
      animate
    >
      <animated.div style={animation.slideIn(1)}>
        <h1>let me build you something.</h1>
      </animated.div>
      <Container type="Flex">
        <Container type="Flex">
          {choices.map((data, i) => (
            <animated.div>
              <Button
                style={{
                  border: "1px solid",
                  transition: "background .3s",
                  borderRadius: "3px",
                }}
                onClick={handleClick(i)}
                bg={isActive[i] ? "#6cfba59e" : "transparent"}
                p=".7em"
                m=".2em"
                {...data}
              />
            </animated.div>
          ))}
        </Container>
      </Container>
      {transition.map(({ item, key, props }) =>
        item ? (
          <Container
            animate
            style={{ position: "absolute", bottom: 0, ...props }}
          >
            <form style={{ display: "flex" }}>
              <input placeholder="Phone" type="phone" />
              <textarea name="Message" id="" cols="50" rows="5"></textarea>
              <button>Submit</button>
            </form>
          </Container>
        ) : null
      )}
    </Container>
  )
}
const sceans = [forwardRef(Scean1), forwardRef(Scean2), forwardRef(Scean3)]

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

  const calcRotation = inr => {
    const xyz = [1, 1, 0]

    const rotation = 180 - inr * 180

    return [...xyz, rotation]
  }

  const [animations, set] = useSpring(() => ({
    config: config.molasses,
    rotate: [1, 1, 1, 0],
    expand: 1,
    fadeIn: [1],
    size: [1],
    transform: [0, 0],
    proj: [3],
  }))

  if (entries.intersectionRatio) {
    const inr = entries.intersectionRatio
    set({
      fadeIn: inr,
      rotate: calcRotation(inr),
      transform: calcXY(inr),
      size: inr,
      expand: inr,
      h1: calcXY(inr / 2),
      proj: calcXY(-inr),
    })
  }

  const setAnimation = anim => {
    const { transform, rotate, fadeIn, expand, proj, size } = anim
    return {
      slideIn: (directionX = 1, directionY = 1) => {
        return {
          transform: transform.interpolate((x, y) => {
            return `translate3d(${x * directionX}px,${y * directionY}px,0px)`
          }),
        }
      },
      fadeIn: speed => ({
        opacity: fadeIn.interpolate(e => Math.pow(e, speed)),
      }),
      rotate: {
        transform: rotate.interpolate((x, y, z, e) => {
          return `rotate3d(${x},${Math.pow(y, 2)},${z},${e}deg)`
        }),
      },
      expand: {
        transform: expand.interpolate(e => `scale(${e})`),
      },
      size: ([min, max, unit]) => {
        console.log(min, max)
        return { maxWidth: size.interpolate(e => min + e * max + unit) }
      },
      proj: proj.interpolate(x => {
        return x
      }),
    }
  }

  const Component = sceans[index]

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
      style={(animation.slideIn(0), animation.fadeIn(5))}
      {...props}
    >
      <animated.div style={animation.slideIn(0)}>
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

// Page Querys

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
