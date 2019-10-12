import React, { useEffect, useState } from "react"
import Container from "../container"
import useCustom from "../useCustom"
import { Text, Box, Heading } from "rebass"
import { useSpring, useTransition, config, animated } from "react-spring"
import { Icon } from "../elements/"

const SmallBox = (color, type) => <Box bg={color}>{type}</Box>

const ViewerComponent = ({ animation, data }) => {
  const [start, setStart] = useState(true)
  console.log(start, setStart)
  const transitions = useTransition(data, item => item.index, {
    from: { opacity: 0, slide: [-60] },
    enter: { opacity: 1, slide: [0] },
    leave: { opacity: 0, slide: [60] },
    immediate: start,
    config: config.molasses,
  })
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
        height: "33vh",
        willChange: "transform",
        transform: animation.transform.interpolate(e => `translateY(${e}%)`),
        zIndex: 9999,
      }}
    >
      {transitions.map(({ item, key, props }) => {
        const { discription, poster, title, stack = [] } = item

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
                flexDirection: "column",
                transform: props.slide.interpolate(e => `translateY(${e}%)`),
              }}
            >
              <Heading
                fontSize="45px"
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
              >
                {title}
              </Heading>
              <Text style={{ flexBasis: "100%" }} fontSize=".8em" p="1em">
                {discription}
              </Text>
              <Icon
                type="Flex"
                justifyContent="flex-end"
                p="1em"
                style={{
                  borderTop: "1px solid white",
                }}
                {...stackObj}
              />
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
    transform: [-150],
    opacity: [0],
  }))

  useEffect(() => {
    if (enterView) {
      set({ transform: [0], opacity: [1] })
      stop()
    } else {
      set({ transform: [-150], opacity: [0] })
    }
  }, [enterView])

  return <ViewerComponent animation={animation} data={view} />
}
