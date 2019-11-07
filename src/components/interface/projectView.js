import styled from "styled-components"
import React, { useRef, useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import Container from "../container"
import projectData from "../../static/projects"
import { Box, Text, Heading, Image } from "rebass"
import useCustom from "../hooks/useCustom"

import { generateKey } from "../util"

const CardImage = animated(Image)

const CardContainer = styled(Container)`
  ${({ showState }) => {
    switch (showState) {
      case 0:
        return `
        opacity:0;
        `
        break
      case 1:
        return `
        &:hover {
    h2 {
      opacity: 0;
    }
    img {
      transform: translateY(10%);
    }
    &:before {
      opacity: 1;
      transform: translateY(-40%);
    }
  }
        `
        break
      case 2:
        return `

         
        h2 {
      opacity: 0;
    }
    img {
      transform: translateY(10%);
    }
    &:before {
      opacity:1 !important;
      transform: translateY(-40%);
    }
        `
        break
    }
  }}

  h2 {
    transition: opacity 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }
  img {
    transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  &:before {
    transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1);
    content: "";
    opacity: 0;
    width: 107%;
    height: 40%;
    z-index: -1;
    transform: translateY(10%);
    position: absolute;
    top: 75%;
    border-radius: 50%;
    box-shadow: rgba(255, 255, 255, 0.75) 2px 2px 9px 0px;
  }
`

const ProjectCard = ({ data, handleClick, activeView }) => {
  const [showState, setState] = useState(1)
  const containerRef = useRef()

  const calc = (x, y) => {
    const con = containerRef.current.getBoundingClientRect()
    return [
      -(y - con.top - con.height / 2) / 20,
      (x - con.left - con.width / 2) / 20,
      1.1,
    ]
  }

  const calcCenter = () => {
    const rect = containerRef.current.getBoundingClientRect()
    const tx = window.innerWidth / 4 - (rect.width / 2 + rect.left)
    const ty =
      window.innerHeight -
      containerRef.current.getBoundingClientRect().bottom +
      -(window.innerHeight / 5)
    return { xy: [tx, ty] }
  }

  const trans = (x, y, s, tx, ty) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s}) `
  const centerTrans = (tx, ty) => ` translateX(${tx}px) translateY(${ty}px)`

  const [hoverAnimation, set] = useSpring(() => ({
    xys: [0, 0, 1],
  }))
  const [clickAnimation, setClick] = useSpring(() => ({
    xy: [0, 0],
  }))

  useEffect(() => {
    if (Object.entries(activeView).length > 0) {
      setState(activeView.index === data.index ? 2 : 0)
    }
    if (showState === 2) {
      setClick(calcCenter())
    }
  }, [showState])

  return (
    <animated.div
      style={{ transform: clickAnimation.xy.interpolate(centerTrans) }}
    >
      <CardContainer
        animate
        ref={containerRef}
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        onClick={e => {
          e.preventDefault()
          handleClick(data)
        }}
        alignItems="center"
        width="100%"
        p="1em"
        showState={showState}
        style={{
          transition: "opacity .7s linear ",
          color: "white",
          willChange: "transform",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: "1em",
          fontSize: ".8em",
          borderRadius: "8px",
          position: "relative",
          boxShadow: "2px 2px 9px 0px rgba(0,0,0,0.75)",
          transform: hoverAnimation.xys.interpolate(trans),
          cursor: "pointer",
        }}
      >
        <Box
          style={{
            flexBasis: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gridArea: "space1",
          }}
        >
          <CardImage
            style={{
              minWidth: "20px",
            }}
            src={data.logo}
          />
        </Box>
        <Heading m="1em" color="#a091af" fontSize={["1em", "1em"]}>
          {data.title}
        </Heading>
      </CardContainer>
    </animated.div>
  )
}

const Projects = ({ key, isActive }) => {
  const [activeView, setView] = useCustom()

  useEffect(() => {
    if (!isActive) {
      setView({})
    }
  }, [isActive])

  return (
    <Container
      key={key}
      animate
      pt={["1em", "10%"]}
      p={[0, "10%"]}
      type="Grid"
      gridTemplateAreas={[`"1fr 1fr"`, `"1fr 1fr 1fr"`]}
      style={{
        width: "100%",
        gridGap: "2em",
        willChange: "opacity",
      }}
    >
      {projectData.map((data, i) => (
        <ProjectCard
          activeView={activeView}
          handleClick={setView}
          key={generateKey(i)}
          data={{ index: i, ...data }}
        />
      ))}
    </Container>
  )
}

export default React.memo(Projects)
