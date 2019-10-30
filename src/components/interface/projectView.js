import React, { useRef, useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import Container from "../container"
import projectData from "../../static/projects"
import { Box, Text, Heading, Image } from "rebass"
import useCustom from "../hooks/useCustom"

import { generateKey } from "../util"

const CardImage = animated(Image)

const ProjectCard = ({ data, handleClick }) => {
  const containerRef = useRef()

  const calc = (x, y) => {
    const con = containerRef.current.getBoundingClientRect()
    return [
      -(y - con.top - con.height / 2) / 20,
      (x - con.left - con.width / 2) / 20,
      1.1,
    ]
  }

  const trans = (x, y, s) =>
    `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

  const [hoverAnimation, set] = useSpring(() => ({ xys: [0, 0, 1] }))

  return (
    <Container
      animate
      ref={containerRef}
      onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
      onMouseLeave={() => set({ xys: [0, 0, 1] })}
      onClick={() => handleClick(data)}
      alignItems="center"
      width="100%"
      p="1em"
      bg="#122535"
      style={{
        color: "white",
        willChange: "transform",
        display: "grid",
        gridTemplateAreas: `"header header header" "space1 space space2"`,
        lineHeight: "1em",
        fontSize: ".8em",
        borderRadius: "8px",
        position: "relative",
        boxShadow: "2px 2px 9px 0px rgba(0,0,0,0.75)",
        transform: hoverAnimation.xys.interpolate(trans),
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
            minWidth: "60px",
          }}
          src={data.logo}
        />
      </Box>
      <Box
        backgroundColor="white"
        m="1em"
        style={{ height: "3em", width: "1px", gridArea: "space" }}
      />
      <Container
        type="Flex"
        style={{
          flexBasis: "100%",
          flexDirection: "column",
          gridArea: "space2",
          justifyContent: "center",
        }}
      >
        <Text>{data.tag}</Text>
      </Container>
      <Heading style={{ gridArea: "header" }}>{data.title}</Heading>
    </Container>
  )
}

const Projects = ({ key, isActive }) => {
  const setView = useCustom()[1]

  useEffect(() => {
    if (!isActive) {
      setView({})
    }
  }, [isActive])

  return (
    <Container
      key={key}
      animate
      p="10%"
      type="Grid"
      gridTemplateAreas={[`"1fr"`, `"1fr 1fr"`, `"1fr 1fr 1fr"`]}
      style={{
        width: "100%",
        gridGap: "2em",
        willChange: "opacity",
      }}
    >
      {projectData.map((data, i) => (
        <ProjectCard
          handleClick={setView}
          key={generateKey(i)}
          data={{ index: i, ...data }}
        />
      ))}
    </Container>
  )
}

export default React.memo(Projects)
