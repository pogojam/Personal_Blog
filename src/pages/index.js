import { RecoilRoot } from "recoil"
import { useWheel, useScroll } from "react-use-gesture"

import { detect } from "detect-browser"
import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  forwardRef,
  useReducer,
} from "react"
import { SubCaption } from "../components/interface/SubCaption"
import { PageState_Context } from "../components/interface/context"
import { PageState } from "../components/interface/reducers"
import { Flex, Box, Heading, Image, Card, Text } from "rebass"
import { Textarea, Input } from "@rebass/forms"
import Container from "../components/container"
import Layout from "../components/layout"
import styled, { keyframes } from "styled-components"
import _ from "lodash"
import { useTransition, animated, useSpring, useSprings } from "react-spring"
import {
  generateKey,
  useObserver,
  buildThresholdList,
  useSceanState,
} from "../components/util"
import { Logo } from "../static/logo"
import { Button } from "../components/elements"
import Icon from "../components/elements/icons"
import { setAnimation } from "../components/animations"
import { Viewer } from "../components/interface/withViewer"
import Projects from "../components/interface/projectView"
import { width, height, transform } from "styled-system"
import axios from "axios"
import { default as NumberFormat } from "react-number-format"
import "animate.css"
import { About } from "../components/interface/about"
import { Hero } from "../components/interface/hero"
import chance from "chance"
import useSpace from "../components/spacer"
//SCEAN Panels

const Styles = styled.div`
  color: white;
  height: 370vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  overflow: hidden;
  position: relative;

  .Caption {
    width: 68%;
    z-index: 99;
  }
`

const Scean1 = () => {
  console.log("Scean 1 Update")
  const captions = [...Array(4)]
  const [location, setLocation] = useState()
  const calc = (transform, index, p, tieY) => {
    const polarity = index % 2 === 1 ? -1 : 1
    switch (transform) {
      case "r":
        return 0
      case "y":
        if (location && index === 1) return
        return p * window.innerHeight * 0.7
      case "x":
        if (index == 3) {
          return 0
        } else {
          return index * p * window.innerWidth * 0.3
        }
      case "o":
        if (index === 1) {
          return 1 - p
        } else {
          return 1
        }
    }
  }

  const [anims, setAnim] = useSprings(captions.length, () => ({
    immediate: true,
    x: [0, 0, 0],
    opacity: [1],
    color: "#ffffff",
    config: { tension: 200, friction: 10 },
  }))

  const transitionHeading = useTransition(location, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })
  const bind = useScroll(
    e => {
      if (window) {
        const maxDis = window.innerHeight * 0.8
        const tieY = 300
        const percentAnimated = _.clamp(window.scrollY / maxDis, 0, maxDis)
        if (!location && percentAnimated < 3) {
          setAnim(i => ({
            x: [
              calc("x", i, percentAnimated),
              calc("y", i, percentAnimated, tieY),
              calc("r", i, percentAnimated),
            ],
            color: percentAnimated > 0.3 ? "#ffffff" : "#ffffff",
            opacity: calc("o", i, percentAnimated),
          }))
        }
        if (!location && percentAnimated > 1.4) {
          setLocation(true)
        }

        if (location && percentAnimated < 1.4) {
          setLocation(false)
        }
      }
    },
    {
      domTarget: window,
    }
  )
  useEffect(bind, [bind])

  return (
    <Styles>
      <animated.div
        style={{
          position: "absolute",
          top: "0",
          left: "6em",
          height: "89vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          opacity: anims[0].opacity.interpolate(p => p),
        }}
        className="Caption"
      >
        {" "}
        <animated.div
          style={{
            transform: anims[3].x.interpolate(
              (x, y, r) => `translate(${x}px,${y}px) rotate3d(0,0,1,${r}deg)`
            ),
          }}
        >
          <Heading
            style={{
              fontSize: "13.7em",
              lineHeight: ".8em",
              textAlign: "left",
              margin: ["1em", "-7px"],
              zIndex: 3,
              color: "bisque",
              fontFamily: "Heebo",
            }}
          >
            <span style={{ fontFamily: "Heebo" }}>Ryan</span>
            <span style={{ fontFamily: "Heebo" }}> Breaux</span>
          </Heading>
        </animated.div>
        <animated.div
          style={{
            willChange: "transform",
            transform: anims[3].x.interpolate((x, y, r) => {
              return `translate(${x}px,${y}px) rotate3d(0,0,1,${r}deg)`
            }),
            color: anims[3].color.interpolate(c => c),
          }}
        >
          <Icon size="3.7em" type="tie" />
          {transitionHeading.map(({ item, key, props }) => {
            return (
              item && (
                <animated.div key={generateKey(key)} style={props}>
                  <Heading>For Hire</Heading>
                </animated.div>
              )
            )
          })}
        </animated.div>
        <div>
          <animated.div
            style={{
              willChange: "transform opacity color",
              transform: anims[1].x.interpolate((x, y, r) => {
                return `translate(${x}px,${y}px) rotate3d(1,1,1,${r}deg)`
              }),

              opacity: anims[1].opacity.interpolate(p => p),
              color: anims[1].color,
            }}
          >
            <span
              style={{
                fontWeight: 900,
                letterSpacing: "3px",
              }}
            >
              {transitionHeading.map(({ item, key, props }) =>
                item ? (
                  <animated.span
                    style={{
                      lineHeight: "84px",
                      fontSize: "4em",
                      letterSpacing: "6px",
                      ...props,
                    }}
                    key={key}
                  >
                    <Heading>Tempe AZ</Heading>
                  </animated.span>
                ) : (
                  <animated.span key={key} style={props}>
                    Curious and humble , full stack developer, entrepreneur.
                  </animated.span>
                )
              )}
            </span>
          </animated.div>
        </div>
      </animated.div>
      <SubCaption />
      <About />
    </Styles>
  )
}

const Background = animated(styled(Box)`
left: 0;
${width}
${height}
${transform}
will-change:transform;
min-height: 100vh;
background: #7d4800;
position: absolute;
transition: opacity 0.3s;

z-index: 0;
/* transform: matrix3d(1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1); */
`)

const HeadingContainer = styled(Container)``

const Scean2 = ({ animation, ...props }) => {
  const [ref, entries] = useObserver({ threshold: buildThresholdList(40) })
  const [isActive, setActive] = useState(false)
  const animateProjects = useSpring(
    isActive
      ? { opacity: 1, transform: "scale(1)" }
      : { opacity: 0, transform: "scale(0)" }
  )
  const [appsAnim, setAppAnim] = useSprings(4, i => ({
    color: "rgba(51, 29, 43, 0.67)",
    rotate: [0],
    slide: [0],
  }))

  const [headingState, setHeading] = useState(true)

  useEffect(() => {
    if (entries.intersectionRatio) {
      setAppAnim({ rotate: entries.intersectionRatio })
      if (entries.intersectionRatio > 0.6 && !isActive) {
        setActive(true)
      }
      if (entries.intersectionRatio < 0.6 && isActive) {
        setActive(false)
      }
    }
  }, [entries])

  useEffect(() => {
    if (isActive) {
      setAppAnim(i => {
        return {
          color: "rgba(51, 29, 43, 1)",
          slide: [0],
          delay: i * 200,
        }
      })
    }
  }, [isActive])

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
        style={{
          transform: appsAnim[0].rotate.interpolate(
            e =>
              `rotate(${e *
                -40}deg) matrix3d(1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`
          ),
        }}
      />
      <HeadingContainer
        animate
        style={{
          transform: appsAnim[0].slide.interpolate(x => `translate(${x}px)`),
        }}
      >
        <Heading
          fontSize={["2em", "37.25rem"]}
          style={{
            width: "40%",
            position: "absolute",
            top: "-.2em",
            textAlign: "center",
            whiteSpace: "nowrap",
            margin: "auto",
            color: "bisque",
            transition: "opacity 1s",
            opacity: headingState ? 1 : 0,
          }}
        >
          {"Apps".split("").map((l, i) => (
            <animated.span
              style={{
                display: "inline-block",
                colort: appsAnim[i],
              }}
            >
              {l}
            </animated.span>
          ))}
        </Heading>
      </HeadingContainer>
      <animated.div
        style={{
          marginLeft: "5vw",
          marginRight: "5vw",

          maxHeight: "100%",
          ...animateProjects,
        }}
      >
        <Projects setHeading={setHeading} />
      </animated.div>
    </Container>
  )
}

const Background2_Styles = styled.div`
  background: url("https://res.cloudinary.com/dxjse9tsv/image/upload/v1589916967/Backgrounds/1.jpg");
  background-size: cover;
  will-change: opacity filter;
  filter: ${({ isSafari }) => (isSafari ? "" : 'url("#water")')};
  position: absolute;
  width: 100%;
  height: 100vh;
  position: absolute;
  transition: opacity 1s linear;
  opacity: ${({ show }) => (show ? 1 : 0)};
  bottom: 0;
  background-position: center;
`
const Background2 = () => {
  // const [store, dispatch] = useContext(PageState_Context)
  const globalID = "about"
  const browser = detect()
  return (
    <Background2_Styles
      isSafari={browser.name === "safari" || browser.name === "ios"}
      // show={store.active === globalID}
    ></Background2_Styles>
  )
}
const Scean3 = () => {
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
        color: "white",
        background: "black",
      }}
      animate
    >
      <animated.div>
        <h1>let me build you something.</h1>
      </animated.div>
      {/* <Background2 /> */}
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
const sceans = [
  React.memo(forwardRef(Scean1)),
  forwardRef(Scean2),
  forwardRef(Scean3),
]

// SCEAN INTERFACE

const Scean_Interface = ({ index, Component, ...props }) => {
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

  return <Component style={{ height: windowHeight.current }} {...props} />
}

const invertList = ["about"]

const IndexPage = ({ data }) => {
  const [store, dispatch] = useReducer(PageState, { active: "hero", view: {} })
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
    <RecoilRoot>
      <Layout style={{ Background: "black" }}>
        <PageState_Context.Provider value={[store, dispatch]}>
          <Logo
            invert={invertList.includes(store.active) ? true : true}
            style={{
              position: "fixed",
              transition: "fill .4s linear",
              width: "40px",
              height: "40px",
              top: "10px",
              left: "10px",
              zIndex: 9999,
              fontFamily: "PoiretOne-Regular, Poiret One !important",
            }}
            store={store}
          />

          <Hero />

          <animated.div style={{ opacity: Anim.body.interpolate(e => e) }}>
            {sceans.map((e, i) => (
              <Scean_Interface
                Component={sceans[i]}
                key={i}
                index={i}
                html={html}
              />
            ))}
          </animated.div>
        </PageState_Context.Provider>
      </Layout>
    </RecoilRoot>
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
