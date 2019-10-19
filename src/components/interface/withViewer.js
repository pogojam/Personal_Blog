import React, { useEffect, useState } from "react"
import Container from "../container"
import useCustom from "../useCustom"
import { Text, Box, Heading, Image } from "rebass"
import { useSpring, useTransition, config, animated } from "react-spring"
import { Icon, Button } from "../elements/"
import { Svg } from "../../static/textures/svg"

const SmallBox = (color, type) => <Box bg={color}>{type}</Box>

const AnimatedBackground = () => {
  return <Svg p="20em" bg="blue" src="dimonds" />
}

const ViewerComponent = ({ animation, data }) => {
  const [start, setStart] = useState(false)

  const transitions = useTransition(
    { y: 0, x: 0, ...data },
    item => item.index,
    {
      from: { opacity: 0, slideY: [60], slideX: [30] },
      enter: ({ y, x }) => ({ opacity: 1, slideY: [y], slideX: [x] }),
      leave: { opacity: 0, slideY: [-60], slideX: [0] },
      immediate: start,
      config: config.molasses,
    }
  )
  return (
    <Container
      animate
      pt="0"
      bg="black"
      type="Flex"
      flexDirection="column"
      alignItems="center"
      width={["100%"]}
      style={{
        overflow: "hidden",
        borderRadius: "8px",
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        position: "fixed",
        color: "white",
        top: 0,
        right: 0,
        maxWidth: "50vw",
        height: "100vh",
        willChange: "transform",
        transform: animation.transform.interpolate(e => `translateX(${e}%)`),
        zIndex: 9999,
      }}
    >
      {transitions.map(({ item, key, props }) => {
        const { discription, poster, title, gitLink, stack = [] } = item

        const stackObj = stack.reduce((acc, val) => {
          Object.assign(acc, { [val]: val })
          return acc
        }, {})
        return (
          <Container
            type="Flex"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              opacity: props.opacity,
              width: "100%",
              height: "100%",
            }}
            animate
            key={key}
          >
            <Container
              style={{
                flexBasis: "100%",
                backgroundSize: "cover",
                backgroundImage: `linear-gradient( rgba(0,0,0,0), rgba(0,0,0,0) ),url(${poster})`,
              }}
            />
            <animated.div
              style={{
                flexBasis: "100%",
                display: "flex",
                maxWidth: "50%",
                flexDirection: "column",
                transform: props.slideY.interpolate(e => `translateY(${e}%)`),
              }}
            >
              <animated.div
                style={{
                  transform: props.slideX.interpolate(e => `translateX(${e}%)`),
                }}
              >
                <Heading
                  fontSize="3.4em"
                  fontWeight="900"
                  style={{
                    whiteSpace: "nowrap",
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
      })}
    </Container>
  )
}

export const Viewer = () => {
  const [view] = useCustom()
  const enterView = Object.entries(view).length > 0

  const [animation, set, stop] = useSpring(() => ({
    transform: [100],
    opacity: [0],
  }))

  useEffect(() => {
    if (enterView) {
      set({ transform: [0], opacity: [1] })
      stop()
    } else {
      set({ transform: [100], opacity: [0] })
    }
  }, [enterView])

  return <ViewerComponent animation={animation} data={view} />
}
