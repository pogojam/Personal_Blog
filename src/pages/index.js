import React, { useState, useEffect, useRef, forwardRef } from "react"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import { Textarea, Input } from "@rebass/forms"
import Container from "../components/container"
import Layout from "../components/layout"
import styled, { keyframes } from "styled-components"
import _ from "lodash"
import { useTransition, animated, useSpring } from "react-spring"
import { generateKey, useObserver, useSceanState } from "../components/util"
import { Icon, Button } from "../components/elements"
import { setAnimation } from "../components/animations"
import { Viewer } from "../components/interface/withViewer"
import Projects from "../components/interface/projectView"
import { width, height, transform } from "styled-system"
import axios from "axios"
import { default as NumberFormat } from "react-number-format"
import "animate.css"
//SCEAN Panels

const Scean1 = ({ html, animation, ...props }, ref) => {
  return (
    <Container
      className="heading"
      pt={["40%", 0]}
      style={{
        color: "black",
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
          style={{
            willChange: "transform,opacity",
            ...animation.fadeIn(14),
            ...animation.size([0, 30, "vw"]),
          }}
        >
          <Box m="1em" style={{ borderTop: "1px solid black" }} />
        </animated.div>
        <animated.div style={(animation.slideIn(1, 0), animation.rotate)}>
          <Text
            fontWeight="100"
            pl="1em"
            fontSize=".7em"
            style={{ maxWidth: "95vh" }}
          >
            Curious and humble , full stack developer, entrepreneur.
          </Text>
          <Text
            fontWeight={200}
            fontFamily='"Gruppo", cursive'
            p="1em"
            style={{
              maxWidth: "95vh",
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
    </Container>
  )
}

const Scean2 = ({ animation, isActive, ...props }, ref) => {
  const HeadingContainer = styled(Container)`
    &:after {
      /* content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 30vh;
      width: 100%;
      background-color: blue;
      z-index: -1;
      transform:matrix3d(1, 0, 0, 1, 25, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
      will-change: transform; */
    }
  `

  const animateProjects = useSpring(
    isActive
      ? { opacity: 1, transform: "scale(1)" }
      : { opacity: 0, transform: "scale(0)" }
  )

  const [headingState, setHeading] = useState(true)

  const Background = animated(styled(Box)`
    left: 0;
    ${width}
    ${height}
    ${transform}
    
    min-height: 100vh;
    background: #f10244;
    position: absolute;
    transition: opacity 0.3s;
    z-index: 0;
    /* transform: matrix3d(1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); */
  `)

  return (
    <Container
      animate
      ref={ref}
      style={{
        willChange: "transfrom, opacity",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        position: "relative",
        ...props.style,
      }}
    >
      <Background
        className="scean2_Background"
        width={["80vh", "100%"]}
        height={["150vh"]}
        transform={[
          "matrix3d(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)",
          "matrix3d(1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)",
        ]}
        style={{ ...animation.scean2 }}
      />
      <HeadingContainer
        animate
        style={{ ...animation.fadeIn(1), ...animation.slideIn(-1) }}
      >
        <Heading
          fontSize={["2em", "10.25rem"]}
          style={{
            width: "40%",
            position: "absolute",
            top: "-.6em",
            textAlign: "center",
            whiteSpace: "nowrap",
            margin: "auto",
            transition: "opacity 1s",
            color: "black",
            opacity: headingState ? 1 : 0,
          }}
        >
          Apps
        </Heading>
      </HeadingContainer>
      <animated.div style={{ maxHeight: "100%", ...animateProjects }}>
        <Projects setHeading={setHeading} isActive={isActive} />
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
  const [phone, setPhone] = useState(null)
  const [message, setMessage] = useState(null)

  const formatPhone = val => {
    const entry = val.split("")
    const filteredArray = entry.filter(e => e !== ")" && e !== "(" && e !== "-")

    if (!Number(filteredArray[filteredArray.length - 1])) return
    if (filteredArray.length > 10) return

    const phonenumber = filteredArray.reduce((acc, num, i) => {
      if (i === 0) {
        return (acc = acc + "(" + num)
      }
      if (i === 2) return (acc = acc + num + ")-")
      if (i === 5) {
        return (acc = acc + num + "-")
      } else {
        acc = acc + num
      }
      return acc
    }, "")

    setPhone(phonenumber)
  }

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

  const handleSubmit = async () => {
    const val = JSON.stringify({ phone, message })
    const data = await axios.post(
      "http://localhost:57339/.netlify/functions/server",
      val
    )

    console.log(data)
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
        color: "black",
      }}
      ref={ref}
      animate
    >
      <animated.div style={{ position: "relative", ...animation.slideIn(1) }}>
        <h1>let me build you something.</h1>
      </animated.div>

      <Container type="Flex">
        {choices.map((data, i) => (
          <animated.div key={i}>
            <Button
              style={{
                border: "1px solid",
                transition: "background .3s",
                borderRadius: "3px",
                cursor: "pointer",
                color: isActive[i] ? "red" : "black",
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
          <Container key={key} animate style={{ ...props }}>
            <form
              mt="1em"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              method="post"
              onSubmit={e => {
                e.preventDefault()
                handleSubmit(e.target.value)
              }}
            >
              <NumberFormat
                maxWidth="60%"
                placeholder="Phone"
                style={{ cursor: "1em" }}
                m=".5em"
                name="Phone"
                format="+1 (###) ###-####"
                mask="_"
              />
              <Textarea
                m=".5em"
                name="Message"
                placeholder="About your project"
                cols="50"
                rows="5"
                onChange={({ target }) => setMessage(target.value)}
              ></Textarea>
              <input
                style={{
                  border: "1px solid black",
                }}
                m="1em"
                p=".3em"
                text="Submit"
                type="submit"
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
    threshold: [
      0.0,
      0.025,
      0.05,
      0.1,
      0.2,
      0.3,
      0.4,
      0.5,
      0.6,
      0.7,
      0.8,
      0.9,
      0.95,
      0.975,
      1.0,
    ],
    rootMargin: "0px 0px 0px 0px",
  })
  const [isActive, setActive] = useState(false)

  const calcXY = inr => {
    const offsetX = window.innerWidth / 2
    const offsetY = window.innerHeight / 2

    const x = offsetX - inr * offsetX
    const y = offsetY - inr * offsetY
    return [x, 0, x]
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
    scean2: [0],
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
      inr >= 0 &&
        set({
          fadeIn: inr,
          rotate: calcRotation(inr),
          transform: calcXY(inr),
          size: inr,
          expand: inr,
          h1: calcXY(inr / 2),
          proj: calcXY(-inr),
          scean2: inr,
        })
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

  const [State, setState] = useState("loading")
  const [Anim, setAnim] = useSpring(() => ({
    body: [0],
  }))

  useEffect(() => {
    setTimeout(() => {
      setState("active")
    }, 500)
  }, [])

  useEffect(() => {
    switch (State) {
      case "active":
        setAnim({
          body: [1],
        })
        break
      case "loading":
        setAnim({
          body: [0],
        })
        break

      default:
        break
    }
  }, [State])

  return (
    <Layout>
      <Viewer />
      <animated.div style={{ opacity: Anim.body.interpolate(e => e) }}>
        {sceans.map((e, i) => (
          <Scean_Interface
            setScean={props.setScean}
            key={generateKey(i)}
            index={i}
            html={html}
          />
        ))}
      </animated.div>
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
