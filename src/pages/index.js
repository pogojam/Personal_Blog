import React, { useState, useEffect, useRef, forwardRef, Children } from "react"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import { Textarea, Input } from "@rebass/forms"
import Container from "../components/container"
import Layout from "../components/layout"
import SEO from "../components/seo"
import styled from "styled-components"
import projectData from "../static/projects"
import _ from "lodash"
import {
  useSprings,
  useTransition,
  config,
  animated,
  useSpring,
  useTrail,
} from "react-spring"
import { generateKey, useObserver, useSceanState } from "../components/util"
import { Icon, Button } from "../components/elements"
import { setAnimation, useShards } from "../components/animations"
import useCustom from "../components/useCustom"
import { Viewer } from "../components/interface/withViewer"
import dimondSVG from "../static/textures/dimond.svg"
import { SVG } from "../static/textures/svg"

//SCEAN Panels

const Scean1 = ({ html, animation, ...props }, ref) => {
  return (
    <Container
      className="heading"
      style={{
        ...animation.fadeIn(4),
        ...animation.slideIn(-1),
        ...props.style,
      }}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      animate
      type="Flex"
      ref={ref}
    >
      <Box
        style={{
          width: "100vw",
          height: "100vh",
          position: "absolute",
        }}
      ></Box>
      <About mt="10vh">
        <animated.div style={(animation.slideIn(-1), animation.rotate)}>
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
          <Text
            fontWeight="100"
            pl="1em"
            fontSize=".7em"
            style={{ maxWidth: "95vh" }}
          >
            Curious and humble , full stack developer and entrepreneur.
          </Text>
          <Text
            p="1em"
            style={{
              maxWidth: "95vh",
              backgroundColor: "#ffffffd4",
              borderRadius: "3px",
            }}
          >
            {" "}
            Big on design and lightning fast code. Found my love for JS
            developing on Node , leveraging the power of Non-Blocking I/O and
            npm’s rich package eco system. Out of necessity I first started
            learning web development in college when I started my first business
            selling clothing online through an e-commerce website.Since I have
            had to learn more advanced techniques building tools for lead
            generation and business productivity.
          </Text>
        </animated.div>
      </About>
      <animated.div style={animation.slideIn()}>
        <animated.div style={animation.expand}>
          <Icon
            linkedin="linkedin.com/in/ryan-breaux-4603396a"
            github="https://github.com/pogojam"
            size="1.3em"
            mt="10em"
          />
        </animated.div>
      </animated.div>
    </Container>
  )
}

const Scean2 = ({ animation, isActive, ...props }, ref) => {
  const setView = useCustom()[1]

  const handleViewer = data => {
    isActive && setView(data)
  }

  useEffect(() => {
    if (!isActive) {
      setView({})
    }
  }, [isActive])

  return (
    <Container
      animate
      type="Flex"
      justifyContent="center"
      flexDirection="column"
      width={[1]}
      ref={ref}
      style={{ ...props.style, ...animation.fadeIn(5) }}
    >
      <animated.div
        style={{ willChange: "transfrom", ...animation.slideIn(-1) }}
      >
        <Heading
          style={{
            width: "40%",
            textAlign: "center",
            fontSize: "7.25rem",
            whiteSpace: "nowrap",
          }}
        >
          Projects
        </Heading>
      </animated.div>
      <animated.div style={animation.slideIn(0.8)}>
        <Flex flexWrap="wrap" style={{ maxWidth: "40vw" }}>
          {projectData.map((data, i) => (
            <ProjectCard
              handleMouseEnter={handleViewer}
              key={generateKey(i)}
              isActive={props.isActive}
              data={{ index: i, ...data }}
            />
          ))}
        </Flex>
      </animated.div>
    </Container>
  )
}

const Scean3 = ({ animation, ...props }, ref) => {
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
        position: "relative",
        willChange: "transform",
        ...animation.fadeIn(1),
        ...props.style,
      }}
      ref={ref}
      animate
    >
      <animated.div style={{ position: "relative", ...animation.slideIn(1) }}>
        <h1>let me build you something.</h1>
      </animated.div>

      <Container type="Flex">
        {choices.map((data, i) => (
          <animated.div>
            <Button
              style={{
                border: "1px solid",
                transition: "background .3s",
                borderRadius: "3px",
                cursor: "pointer",
                color: isActive[i] ? "white" : "black",
              }}
              onClick={handleClick(i)}
              bg={isActive[i] ? "#0000009e" : "transparent"}
              p=".7em"
              m=".2em"
              {...data}
            />
          </animated.div>
        ))}
      </Container>
      {transition.map(({ item, key, props }) =>
        item ? (
          <Container
            animate
            style={{ position: "absolute", bottom: "2em", ...props }}
          >
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Input
                maxWidth="60%"
                placeholder="Phone"
                type="number"
                style={{ cursor: "1em" }}
                m=".5em"
              />
              <Textarea
                m=".5em"
                name="Message"
                placeholder="About your project"
                cols="50"
                rows="5"
              ></Textarea>
              <Button
                style={{
                  border: "1px solid black",
                }}
                m="1em"
                p=".3em"
                text="Submit"
              />
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
    rootMargin: "30px 0px 0px 0px",
  })
  const [isActive, setActive] = useState(false)
  // const [shard, setShard] = useShards()

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

  const [animations, set, stop] = useSpring(() => ({
    config: config.molasses,
    rotate: [1, 1, 1, 0],
    expand: 1,
    fadeIn: [1],
    size: [1],
    transform: [0, 0],
    proj: [3],
  }))

  useEffect(() => {
    const inr = entries.intersectionRatio
    const activeThreshold = 0.9
    if (inr > activeThreshold) {
      setActive(true)
    }
    if (inr < activeThreshold) {
      setActive(false)
    }

    if (inr) {
      inr >= 0.2
        ? set({
            fadeIn: inr,
            rotate: calcRotation(inr),
            transform: calcXY(inr),
            size: inr,
            expand: inr,
            h1: calcXY(inr / 2),
            proj: calcXY(-inr),
          })
        : stop()
    }
  }, [entries.intersectionRatio])

  const Component = sceans[index]

  return (
    <Component
      isActive={isActive}
      animation={setAnimation(animations)}
      ref={ref}
      style={{ minHeight: "100vh" }}
      {...props}
    />
  )
}

function Shard(node) {
  let viewBox = { x: window.innerWidth, y: window.innerHeight }
  const accelX = 0.5 * Math.random()
  const accelY = 0.5 * Math.random()

  this.getTransVal = () => {
    const transitions = node.style.transform.split(" ")
    const x = Number(transitions[0].replace(/[^\d.]/g, ""))
    const y = Number(transitions[1].replace(/[^\d.]/g, ""))
    return [x, y]
  }

  this.setObserver = () => {
    const options = {
      threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      rootMargin: "30px 0px 0px 0px",
    }

    const observer = new IntersectionObserver(e => {
      console.log(e)
      console.log("hello")
    }, options)

    observer.observe(node)
  }

  this.getPosition = () => {
    const [tranX, tranY] = this.getTransVal()
    const { width, height, x, y } = node.getBoundingClientRect()
    let outX = tranX
    let outY = tranY

    // console.log(node.getBoundingClientRect())

    if (x > width) {
      // outX = 0
    }
    if (y > height) {
      // outY = 0
    }

    return [outX, outY]
  }

  this.update = () => {
    const [x, y] = this.getPosition()
    node.style.transform = `translateX(${x + accelX}px) translateY(${y +
      accelY}px)`
  }
  this.setObserver()
  node.style.transform = `translateX(0px) translateY(0px)`
  window.onresize = () =>
    (viewBox = { x: window.innerWidth, y: window.innerHeight })
}

const Background = () => {
  const [nodes, setNodes] = useState()

  useEffect(() => {
    const nodeList = document.querySelectorAll(".shard")
    initCanvas(nodeList)
  }, [])

  const initCanvas = list => {
    const shards = []
    list.forEach(el => shards.push(new Shard(el)))

    const step = stamp => {
      shards.forEach(el => {
        el.update()
      })
      window.requestAnimationFrame(step)
    }

    window.requestAnimationFrame(step)
  }

  return (
    <SVG
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        opacity: 0.3,
      }}
      src="dimonds"
    ></SVG>
  )
}

const IndexPage = ({ data, ...props }) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { html } = markdownRemark
  return (
    <Layout>
      <SEO title="Home" />
      <Viewer />
      <Background />
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

const ProjectCard = ({ data, handleMouseEnter, ...props }) => {
  return (
    <Container
      style={{ minHeight: "5em" }}
      alignItems="center"
      justifyContent="center"
      mt="3em"
      onClick={() => handleMouseEnter(data)}
      width={[1, 1 / 3]}
    >
      <Image src={data.logo} />
    </Container>
  )
}

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
