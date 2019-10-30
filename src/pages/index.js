import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useRef,
  forwardRef,
  Children,
} from "react"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import { Textarea, Input } from "@rebass/forms"
import Container from "../components/container"
import Layout from "../components/layout"
import styled from "styled-components"
import _ from "lodash"
import { useTransition, animated, useSpring } from "react-spring"
import { generateKey, useObserver, useSceanState } from "../components/util"
import { Icon, Button } from "../components/elements"
import { setAnimation } from "../components/animations"
import { Viewer } from "../components/interface/withViewer"
import Projects from "../components/interface/projectView"

//SCEAN Panels

const Scean1 = ({ html, animation, ...props }, ref) => {
  return (
    <Container
      className="heading"
      pt={["40%", 0]}
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
      <About>
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
            selling clothing online through an e-commerce website. I have since
            learned more advanced techniques building tools for lead generation
            and business productivity.
          </Text>
        </animated.div>
      </About>
      <animated.div style={animation.expand}>
        <Icon
          linkedin="linkedin.com/in/ryan-breaux-4603396a"
          github="https://github.com/pogojam"
          size="1.3em"
        />
      </animated.div>
    </Container>
  )
}

const Scean2 = ({ animation, isActive, ...props }, ref) => {
  const animateProjects = useSpring(isActive ? { opacity: 1 } : { opacity: 0 })
  return (
    <Container
      animate
      ref={ref}
      pt="3em"
      style={{
        willChange: "transfrom, opacity",
        ...props.style,
        ...animation.slideIn(-1),
      }}
    >
      <animated.div
        style={{ ...animation.fadeIn(1), ...animation.slideIn(-1) }}
      >
        <Heading
          pl="5vw"
          fontSize={["5.25rem", "7.25rem"]}
          style={{
            width: "40%",
            textAlign: "center",
            whiteSpace: "nowrap",
          }}
        >
          Projects
        </Heading>
      </animated.div>

      <animated.div style={{ maxHeight: "100%", ...animateProjects }}>
        <Projects isActive={isActive} />
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
  // function roundNumber(number, decimals) {
  //   var newnumber = new Number(number + "").toFixed(parseInt(decimals))
  //   return parseFloat(newnumber)
  // }
  // const incArr = inc => {
  //   let length = 1 / inc
  //   let output = []

  //   for (let i = 0; i < length - 1; ++i) {
  //     output.length === 0 && output.push(0 + inc)
  //     output.push(roundNumber(output[i] + inc, 12))
  //   }
  //   return output
  // }

  const windowHeight = useRef(
    typeof window !== "undefined" ? `${window.innerHeight}px` : "80vh"
  )
  const activeThreshold = 0.6

  const [ref, entries] = useObserver({
    threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
    rootMargin: "0px 0px 0px 0px",
  })
  const [isActive, setActive] = useState(false)

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
    config: { mass: 5, tension: 350, friction: 40 },
    rotate: [1, 1, 1, 0],
    expand: 1,
    fadeIn: [0],
    size: [1],
    transform: [0, 0],
    proj: [3],
  }))

  useEffect(() => {
    const inr = entries.intersectionRatio
    if (inr > activeThreshold) {
      setActive(true)
    }
    if (inr < activeThreshold) {
      setActive(false)
      stop()
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
  }, [entries.intersectionRatio, isActive])

  const Component = sceans[index]

  return (
    <Component
      isActive={isActive}
      animation={setAnimation(animations)}
      ref={ref}
      style={{ height: windowHeight.current }}
      {...props}
    />
  )
}

const IndexPage = ({ data, ...props }) => {
  const { markdownRemark } = data // data.markdownRemark holds our post data
  const { html } = markdownRemark

  return (
    <Layout>
      <Viewer />
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
