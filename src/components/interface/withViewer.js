import React, { useEffect, useState, useLayoutEffect } from "react"
import Container from "../container"
import generateKey from "../util"
import useCustom from "../hooks/useCustom"
import { Text, Box, Heading, Image } from "rebass"
import { useSpring, useTransition, config, animated } from "react-spring"
import { Icon, Button } from "../elements/"
import ProjectData from "../../static/projects"
import styled, { keyframes, css } from "styled-components"
import useMobileDetect from "use-mobile-detect-hook"
import projects from "../../static/projects"

const animation_slowFadeIn = keyframes`
  from{
      opacity:1;
  }
  to{
    opacity:.6;
  }
`

const animation_slideIn = keyframes`
  from:{
    transition:translateX('')
  }
  to{

  }
`

const CircleButton = styled(Button)`
  position: relative;
  width: 3em;
  height: 3em;
  margin: 1em;
  color: "white";
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 3s;
  border-radius: 50%;
  background: black;

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    border: 1px solid white;

    box-shadow: 0 0 18pt 2pt blue, 0 0 0pt 2pt blue inset;
    transition: transform 4s;
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-shadow: 0 0 18pt 2pt red, 0 0 0pt 2pt red inset;
    transition: transform 4s;
  }

  &:hover {
    &:before {
      transform: scale(1.1);
    }
    &:after {
      transform: scale(1.3);
    }
  }
`

const BackButton = styled(Button)`
  position: absolute;
  right: 0;
  transform: translateY(-50%) translateX(0%);
  transition: transform opacity 1s 5s;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  font-family: "Monoton", cursive !important;
  font-size: 1.8em;
  top: 50%;
  height: 100%;
  width: 25%;
  max-width: 100px;
  display: flex;
  align-items: center;
  color: black;

  &:before {
    content: "";
    border-radius: 3px;
    width: 0.2em;
    height: 2em;
    background: black;
    position: absolute;
    left: 50%;
    transform: rotate(45deg) translate(0, 0);
  }
  &:after {
    content: "";
    left: 50%;
    border-radius: 3px;
    width: 0.2em;
    height: 2em;
    background: black;
    position: absolute;
    transform: rotate(-45deg) translate(0, 0);
    /* transform: translateY(-1em) translateX(0em); */
  }

  &:hover {
    /* &:after {
      transform: translateY(-1em) translateX(0em);
    }

    &:before {
      transform: translateY(1em) translateX(0em);
    } */
  }
`

const SlantView = styled(Container)`
  will-change: transform;
  transition: transform 1.2s 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  z-index: 1;

  ${({ isActive, isMobile, side }) =>
    isActive
      ? isMobile
        ? css`
            transform: translateX(0%);
          `
        : css`
            transform: translateX(${side === "left" ? "0%" : "0%"});
          `
      : isMobile
      ? css`
          transform: translateX(0%);
        `
      : css`
          transform: translateX(${side === "left" ? "-100%" : "100%"});
        `}
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${animation_slowFadeIn} 4s forwards;
  }
`

const Content = ({
  data: { discription, poster, title, gitLink },
  stackObj,
  props,

  isActive,
  inAnimation,
  color,
  setView,
}) => {
  const detectMobile = useMobileDetect()
  const isMobile = detectMobile.isMobile()
  const mobileAnim = [`translateX(0%)`, `translateX(0%)`]
  const desktopAnim = [`translateX(0%)  `, `translateX(40%) `]

  const backgroundSlide = useSpring({
    from: {
      transform: isMobile ? mobileAnim[0] : desktopAnim[0],
    },
    to: {
      transform: isMobile ? mobileAnim[1] : desktopAnim[1],
    },
    config: { tension: 10, mass: 4 },
  })

  const slideCalcY = (val, pol) => `translateY(${val * pol}%)`
  const playVideo = (p, ref) => {
    if (p === poster && ref) {
      ref.play()
    }
  }

  const containerIndex = status => {
    return status ? 1 : 0
  }

  return (
    <>
      <Container
        animate
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "50vh",
          width: "100%",
          willChange: "transform ",
          zIndex: containerIndex(isActive),
          transform: inAnimation.slide.interpolate(e => slideCalcY(e, -1)),
        }}
        type="Flex"
        flexBasis="100%"
      >
        <SlantView
          isMobile={isMobile}
          side="left"
          isActive={isActive}
          style={{
            position: "relative",
            width: "50vw",
            height: "100%",
            overflow: "hidden",
            background: "black",
          }}
        >
          {ProjectData.map((d, i) => (
            <Container
              key={i}
              as="video"
              animate
              className="prjImg"
              ref={ref => playVideo(d.poster, ref)}
              style={{
                position: "absolute",
                background: `url(${poster})`,
                backgroundSize: "cover",
                top: isMobile ? "0" : "0",
                right: isMobile ? "0" : "0",
                minHeight: "100%",
                opacity: d.poster === poster ? 1 : 0,
              }}
            >
              <source src={d.video} type="video/mp4" />
            </Container>
          ))}
        </SlantView>

        <SlantView
          isMobile={isMobile}
          isActive={isActive}
          style={{
            position: "absolute",
            width: "50vw",
            height: "100%",
            right: "0%",
            background: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              maxWidth: "30%",
              textAlign: "center",
              transition: "opacity 1s .4s",
              opacity: isActive ? 1 : 0,
            }}
            px={["1em", "3em"]}
          >
            {discription}
          </Text>
        </SlantView>
      </Container>

      <animated.div
        style={{
          willChange: "transform opacity",
          position: "fixed",
          zIndex: 1,
          left: 0,
          bottom: 0,
          height: "50%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          background: "transparent",
          opacity: props.opacity.interpolate(e => e),
          transform: inAnimation.slide.interpolate(e => slideCalcY(e, 1)),
        }}
      >
        <Heading
          fontSize={["3em", "7em"]}
          fontWeight="900"
          textAlign={["left", "center"]}
          style={{
            whiteSpace: "wrap",
            display: "flex",
            transition: "opacity 1s .3s",
            opacity: isActive ? 1 : 0,
            color: "black",
            textShadow: "2px 2px #2779a0",
          }}
          fontWeight="900"
          px="1em"
          py=".5em"
        >
          {title}
        </Heading>
        <Container
          style={{ alignItems: "flex-end" }}
          flexBasis="100%"
          type="Flex"
          flexDirection={["column", "row"]}
        >
          <Box style={{ flexBasis: "50%" }}></Box>
        </Container>
        <Container
          type="Flex"
          p={["0em", "1em"]}
          alignItems="center"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          style={{
            flexBasis: "38%",
            zIndex: 999,
            position: "absoulte",
            top: "50%",
          }}
        >
          <CircleButton
            style={{
              transition: "opacity 1s .2s",
              opacity: isActive ? 1 : 0,
            }}
            text="View"
          />
          <Icon
            style={{
              transition: "opacity 1s .1s",
              opacity: isActive ? 1 : 0,
            }}
            className="hoverGrow"
            github={gitLink}
            color="black"
          />
          <Icon
            color="black"
            style={{
              transition: "opacity 1s ",
              opacity: isActive ? 1 : 0,
            }}
            {...stackObj}
          />
        </Container>
        <BackButton
          isActive={isActive}
          onClick={() => {
            setView(false)
          }}
        />
      </animated.div>
    </>
  )
}

const ViewerComponent = ({ inAnimation, data, isActive, setView }) => {
  const transitions = useTransition(data, null, {
    from: { opacity: 0, slideY: [60], slideX: [30] },
    enter: { opacity: 1, slideY: [0], slideX: [0] },
    leave: { opacity: 0, slideY: [-60], slideX: [-30] },
    config: { mass: 1, tension: 210, friction: 20 },
  })
  return (
    <>
      {transitions.map(({ key, props }) => {
        const { stack = [] } = data

        const stackObj = stack.reduce((acc, val) => {
          Object.assign(acc, { [val]: val })
          return acc
        }, {})

        return (
          <Content
            key={key}
            setView={setView}
            inAnimation={inAnimation}
            key={key}
            stackObj={stackObj}
            props={props}
            data={data}
            isActive={isActive}
          />
        )
      })}
    </>
  )
}

const scrollEvent = offsetY => () =>
  window.scrollTo({
    top: offsetY,
    behavior: "smooth",
  })

export const Viewer = () => {
  const [view, setView] = useCustom()
  const [enterView, setEnter] = useState()
  const [pRef, setRef] = useState()

  useEffect(() => {
    if (Object.entries(view).length > 0) {
      setEnter(true)
    }

    if (view.ref) {
      setRef(pRef)
    }
  }, [view])

  const showProject = () => {
    if (view.ref) {
      console.log("I should be lighting up ")
    }
  }

  const [animation, set, stop] = useSpring(() => ({
    pRef: [2],
    slide: [100],
    opacity: [0],
    onRest: ({ opacity }) => {
      if (opacity[0] === 0) {
        const el = document.querySelector(".projectContainer")

        el.style.opacity = 1
        setView({})
      }
    },
  }))

  useEffect(() => {
    if (enterView) {
      set({ slide: [0], opacity: [1] })
      document.body.style.overflow = "hidden"
      stop()
    } else {
      document.body.style.overflow = "scroll"
      const icon = view.ref
      console.log(icon)
      if (icon) {
        icon.current.style.transition = "opacity .7s"
        icon.current.style.opacity = 0
      }
      set({
        slide: [100],
        opacity: [0],
      })
    }
  }, [enterView])

  return (
    <ViewerComponent
      setView={setEnter}
      isActive={enterView}
      inAnimation={animation}
      data={view}
    />
  )
}
