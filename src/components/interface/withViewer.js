import React, { useEffect, useState, useLayoutEffect } from "react"
import Container from "../container"
import generateKey from "../util"
import useCustom from "../hooks/useCustom"
import { Text, Box, Heading, Image } from "rebass"
import { useSpring, useTransition, config, animated } from "react-spring"
import { Icon, Button } from "../elements/"
import ProjectData from "../../static/projects"
import styled, { keyframes, css } from "styled-components"

const Wrapper = ({ children, zIndex, isActive }) => {
  const [marginTop, setMargin] = useState(40)

  useLayoutEffect(() => {
    const top = document.getElementById("Nav").getBoundingClientRect().height
    setMargin(top)
  }, [])

  return (
    <Container
      animate
      type="Flex"
      flexDirection="column"
      alignItems="center"
      width={["100%"]}
      height={["100%"]}
      style={{
        overflow: "hidden",
        borderBottomLeftRadius: "4px",
        position: "fixed",
        color: "white",
        top: 0,
        right: 0,
        willChange: "transform",
        transform: isActive ? "translateX(0%)" : "translateX(-100%)",
        backfaceVisibility: "none",
      }}
    >
      {children}
    </Container>
  )
}

const slowFadeIn = keyframes`
  from{
      opacity:1;
  }
  to{
    opacity:.6;
  }
`

const ImageView = styled(Container)`
  transform: translateX(-36%)
    matrix3d(1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

  .prjImg {
    transform: matrix3d(1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    animation: ${slowFadeIn} 4s forwards;
  }
`

const SlantView = styled(Container)`
  will-change: transform;
  transition: transform 1.2s cubic-bezier(0.215, 0.61, 0.355, 1);

  ${({ isActive, side }) =>
    isActive
      ? css`
          transform: translateX(-36%)
            matrix3d(1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        `
      : css`
          transform: translateX(${side === "left" ? -100 : 0}%)
            matrix3d(1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
        `}
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${slowFadeIn} 4s forwards;
  }
`

const Content = ({
  data: { discription, poster, title, gitLink },
  stackObj,
  props,
  key,
  isActive,
  inAnimation,
  color,
}) => {
  const backgroundSlide = useSpring({
    from: {
      transform:
        "translateX(0%) matrix3d(1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) ",
    },
    to: {
      transform:
        "translateX(40%) matrix3d(1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1) ",
    },
    config: { tension: 10, mass: 4 },
  })

  const slideCalcY = (val, pol) => `translateY(${val * pol}%)`

  return (
    <>
      <Container
        animate
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          width: "100%",
          willChange: "transform ",
          opacity: inAnimation.opacity.interpolate(e => e),
        }}
        type="Flex"
        flexBasis="100%"
      >
        <SlantView
          side="left"
          isActive={isActive}
          style={{
            position: "absolute",
            width: "100vw",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {ProjectData.map((d, i) => (
            <Container
              animate
              className="prjImg"
              style={{
                ...backgroundSlide,
                background: `url(${d.poster})`,
                position: "absolute",
                backgroundSize: "cover",
                top: 0,
                left: "-15%",
                width: "115%",
                minHeight: "100%",
                opacity: d.poster === poster ? 1 : 0,
              }}
            />
          ))}
        </SlantView>

        <SlantView
          isActive={isActive}
          style={{
            position: "absolute",
            width: "100vw",
            height: "100%",
            right: "-104%",
            border: "1px solid #9800e6",
            background: color,
          }}
        ></SlantView>
      </Container>

      <animated.div
        style={{
          willChange: "transform opacity",
          position: "fixed",
          left: 0,
          bottom: 0,
          height: "50%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          opacity: props.opacity.interpolate(e => e),
          transform: inAnimation.slide.interpolate(e => slideCalcY(e, 1)),
        }}
      >
        <animated.div
          style={{
            willChange: "transform",
            transform: props.slideX.interpolate(
              e => `translateX(${slideCalcY(e, -1)}%)`
            ),
          }}
        >
          <Heading
            fontSize="3.4em"
            fontWeight="900"
            style={{
              whiteSpace: "wrap",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
            }}
            fontWeight="100"
            px="1em"
            py=".5em"
          >
            {title}
          </Heading>
        </animated.div>
        <Container flexBasis="100%" type="Flex">
          <Text
            style={{
              display: "flex",
              flexBasis: "50%",
              textAlign: "left",
            }}
            p="3em"
            pr="10em"
          >
            {discription}
          </Text>
          <Box style={{ flexBasis: "50%" }}></Box>
        </Container>
        <Container
          type="Flex"
          justifyContent="flex-end"
          p="1em"
          style={{
            borderTop: "1px solid white",
            flexBasis: "18%",
            minHeight: "55px",
          }}
        >
          <Container mr="auto" type="Flex">
            <Icon className="hoverGrow" github={gitLink} color="white" />
            <Button
              className="hoverGrow"
              text="Visit"
              color="white"
              fontSize=".8em"
              px=".6em"
              style={{ borderRadius: "3px" }}
            />
          </Container>
          <Icon {...stackObj} />
        </Container>
      </animated.div>
    </>
  )
}

const ViewerComponent = ({ inAnimation, data, isActive }) => {
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

        console.log(isActive)

        return (
          <Content
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

export const Viewer = () => {
  const [view] = useCustom()
  const enterView = Object.entries(view).length > 0

  const [animation, set, stop] = useSpring(() => ({
    slide: [100],
    opacity: [0],
  }))

  useEffect(() => {
    if (enterView) {
      const offset = window.pageYOffset
      set({ slide: [0], opacity: [1] })
      window.addEventListener("scroll", () => {
        window.scrollTo({
          top: offset,
          behavior: "smooth",
        })
      })
      stop()
    } else {
      set({ slide: [100], opacity: [0] })
    }
  }, [enterView])

  return (
    <ViewerComponent isActive={enterView} inAnimation={animation} data={view} />
  )
}
