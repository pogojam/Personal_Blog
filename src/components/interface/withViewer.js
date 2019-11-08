import React, { useEffect, useState, useLayoutEffect } from "react"
import Container from "../container"
import generateKey from "../util"
import useCustom from "../hooks/useCustom"
import { Text, Box, Heading, Image } from "rebass"
import { useSpring, useTransition, config, animated } from "react-spring"
import { Icon, Button } from "../elements/"
import ProjectData from "../../static/projects"
import styled, { keyframes } from "styled-components"

const Wrapper = ({ children, animation }) => {
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
        // transform: animation.transform.interpolate(e => `translateX(${e}%)`),
        zIndex: 991,
      }}
    >
      {children}
    </Container>
  )
}

const slowFadeIn = keyframes`
  from{
background-color:#000000e0;
  }
  to{
    background-color:#0000001f;
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
    animation: ${slowFadeIn} 4s forwards;
  }
`

const SlantView = styled(Container)`
  transform: translateX(-36%)
    matrix3d(1, 0, 0, 0, -1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);

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

  return (
    <Container
      type="Flex"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
      flexDirection={["column"]}
      key={key}
    >
      <Container style={{ position: "relative" }} type="Flex" flexBasis="100%">
        <SlantView
          style={{
            willChange: "transform",
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
          style={{
            position: "absolute",
            width: "100vw",
            height: "100%",
            right: "-104%",
            backgroundColor: "#ff0000",
          }}
        ></SlantView>
      </Container>

      <animated.div
        style={{
          willChange: "opacity",
          flexBasis: "100%",
          display: "flex",
          flexDirection: "column",
          opacity: props.opacity.interpolate(e => e),
        }}
      >
        <animated.div
          style={{
            willChange: "transform",
            transform: props.slideX.interpolate(e => `translateX(${e}%)`),
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
            backgroundColor: "#733e7359",
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
    </Container>
  )
}

const ViewerComponent = ({ animation, data }) => {
  const transitions = useTransition(
    { y: 0, x: 0, ...data },
    item => item.index,
    {
      from: { opacity: 0, slideY: [60], slideX: [30] },
      enter: { opacity: 1, slideY: [0], slideX: [0] },
      leave: { opacity: 0, slideY: [-60], slideX: [-30] },
      config: { mass: 1, tension: 210, friction: 20 },
    }
  )
  return (
    <Wrapper animation={animation}>
      {transitions.map(({ item, key, props }) => {
        const { stack = [] } = item

        const stackObj = stack.reduce((acc, val) => {
          Object.assign(acc, { [val]: val })
          return acc
        }, {})

        return (
          <Content key={key} stackObj={stackObj} props={props} data={item} />
        )
      })}
    </Wrapper>
  )
}

export const Viewer = () => {
  const [view] = useCustom()
  const enterView = Object.entries(view).length > 0

  const [animation, set, stop] = useSpring(() => ({
    transform: [120],
    opacity: [0],
  }))

  useEffect(() => {
    if (enterView) {
      set({ transform: [0], opacity: [1] })
      stop()
    } else {
      set({ transform: [120], opacity: [0] })
    }
  }, [enterView])

  return <ViewerComponent animation={animation} data={view} />
}
