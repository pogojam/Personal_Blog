import React, { useEffect, useState, Children } from "react"
import Container from "../container"
import generateKey from "../util"
import useCustom from "../hooks/useCustom"
import { Text, Box, Heading, Image } from "rebass"
import { useSpring, useTransition, config, animated } from "react-spring"
import { Icon, Button } from "../elements/"
import { Svg } from "../../static/textures/svg"

const Wrapper = ({ children, animation }) => (
  <Container
    animate
    mt="5vh"
    bg="#313131"
    type="Flex"
    flexDirection="column"
    alignItems="center"
    width={["100%"]}
    height={["75vh", "40vh"]}
    style={{
      overflow: "hidden",
      borderBottomLeftRadius: "4px",
      position: "fixed",
      color: "white",
      top: 0,
      right: 0,
      maxWidth: "100vw",
      willChange: "transform",
      transform: animation.transform.interpolate(e => `translateY(${e}%)`),
      zIndex: 991,
    }}
  >
    {children}
  </Container>
)

const Content = ({
  data: { discription, poster, title, gitLink },
  stackObj,
  props,
  key,
}) => {
  const backgroundSlide = useSpring({
    from: { backgroundPosition: "0% center" },
    to: { backgroundPosition: "60% center" },
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
      flexDirection={["column", "row"]}
      key={key}
    >
      <Container
        animate
        style={{
          flexBasis: "100%",
          backgroundSize: "cover",
          backgroundImage: `linear-gradient( rgba(0,0,0,0), rgba(0,0,0,0) ),url(${poster})`,
          willChange: "transform , backgroundPosition",
          ...backgroundSlide,
        }}
      />
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
              flexBasis: "45%",
              display: "flex",
              alignItems: "center",
            }}
            fontWeight="100"
            px="1em"
            py=".5em"
          >
            {title}
          </Heading>
        </animated.div>
        <Text
          textAlign={"center"}
          style={{
            display: "flex",
            alignItems: "center",
            flexBasis: "100%",
          }}
          fontSize=".8em"
          p="1em"
          px="2.5em"
        >
          {discription}
        </Text>

        <Container
          type="Flex"
          justifyContent="flex-end"
          p="1em"
          style={{
            borderTop: "1px solid white",
            flexBasis: "18%",
          }}
        >
          <Container mr="auto" type="Flex">
            <Icon github={gitLink} color="white" />
            <Button
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
    transform: [-100],
    opacity: [0],
  }))

  useEffect(() => {
    if (enterView) {
      set({ transform: [0], opacity: [1] })
      stop()
    } else {
      set({ transform: [-100], opacity: [0] })
    }
  }, [enterView])

  return <ViewerComponent animation={animation} data={view} />
}
