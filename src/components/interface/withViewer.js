import React, { useEffect, useState, Children } from "react"
import Container from "../container"
import generateKey from "../util"
import useCustom from "../useCustom"
import { Text, Box, Heading, Image } from "rebass"
import { useSpring, useTransition, config, animated } from "react-spring"
import { Icon, Button } from "../elements/"
import { Svg } from "../../static/textures/svg"

const SmallBox = (color, type) => <Box bg={color}>{type}</Box>

const AnimatedBackground = () => {
  return <Svg p="20em" bg="blue" src="dimonds" />
}

const Nav = ({ data, handleViewer, isActive }) => {
  return (
    <Box>
      {data.map((data, i) => (
        <ProjectCard
          handleMouseEnter={handleViewer}
          key={generateKey(i)}
          isActive={isActive}
          data={{ index: i, ...data }}
        />
      ))}
    </Box>
  )
}

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

const Wrapper = ({ children, animation }) => (
  <Container
    animate
    mt="5vh"
    bg="black"
    type="Flex"
    flexDirection="column"
    alignItems="center"
    width={["100%"]}
    style={{
      overflow: "hidden",
      borderBottomLeftRadius: "4px",
      position: "fixed",
      color: "white",
      top: 0,
      right: 0,
      maxWidth: "100vw",
      height: "40vh",
      willChange: "transform",
      transform: animation.transform.interpolate(e => `translateX(${e}%)`),
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
        opacity: props.opacity,
        width: "100%",
        height: "100%",
      }}
      animate
      key={key}
    >
      <Container
        animate
        style={{
          flexBasis: "100%",
          backgroundSize: "130% 130%",
          backgroundImage: `linear-gradient( rgba(0,0,0,0), rgba(0,0,0,0) ),url(${poster})`,
          ...backgroundSlide,
          ...props.slideX,
        }}
      />
      <animated.div
        style={{
          flexBasis: "80%",
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
}

const ViewerComponent = ({ animation, data }) => {
  const [start, setStart] = useState(false)

  const transitions = useTransition(
    { y: 0, x: 0, ...data },
    item => item.index,
    {
      from: { opacity: 0, slideY: [60], slideX: [30] },
      enter: ({ y, x }) => [{ opacity: 1, slideY: [y], slideX: [x] }],
      leave: { opacity: 0, slideY: [-60], slideX: [0] },
      immediate: start,
      config: config.molasses,
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
  // const enterView = true

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
