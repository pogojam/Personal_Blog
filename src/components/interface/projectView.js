import { PageState_Context } from "./context"

import styled, { keyframes, css } from "styled-components"
import React, { useRef, useContext, useEffect, useState } from "react"
import { useSpring, animated } from "react-spring"
import Container from "../container"
import projectData from "../../static/projects"
import { Box, Text, Heading, Image } from "rebass"
import useCustom from "../hooks/useCustom"
import chance from "chance"
import { Viewer } from "./withViewer"
import { generateKey } from "../util"

const CardImage = animated(Image)

const CardContainer = styled(Container)`
  ${({ showState, ring }) => {
    switch (showState) {
      case 0:
        return css`
          opacity: 0;
          pointer-events: none;
        `
        break
      case 1:
        return css`
          &:hover {
            background-color: #d5fbff00;
            h2 {
              transform: scale(1.2);
            }
            img {
              transform: rotateY(360deg) translateY(-38px);
            }
            &:before {
              opacity: 1;
              transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5;
              transform: translateY(-40%) scale(0.7);
            }
          }

          img {
            transition: transform 4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            transform: rotateY(0deg) translateY(0px);
          }
        `
        break
      case 2:
        return css`
          pointer-events: none;
          background-color: #d5fbff00 !important;
          box-shadow: none !important;
          h2 {
            opacity: 0;
          }
          img {
            transform: translateY(0%);
          }
          &:before {
            opacity: 1 !important;
            transform: translateY(-40%);
          }
        `
        break
    }
  }}

  transition:opacity .7s , background-color .7s;
  height: 100%;

  h2 {
    color: black;
    transition: opacity 0.6s 0.5s;
    position: absolute;
    left: -20px;
    top: 0;
    margin-bottom: 0;
    margin-left: 0;
    padding: 0.2em;
    text-align: center;
    /* border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px; */

    &:after {
      content: "";
      width: 0;
      height: 1px;
      background-color: ${({ ring }) => ring};
      position: absolute;
      bottom: 0;
      left: 50%;
      transition: width 1s;
      transform: translate3d(-50%, 8px, 0);
    }
  }
  img {
  }

  /* &:before {
    background-color: black;
    transition: all 0.6s cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s;
    content: "";
    opacity: 0;
    width: 42%;
    height: 11%;
    z-index: -1;
    transform: translateY(15%) scale(0.4);
    position: absolute;
    top: 75%;
    border-radius: 50%;
  } */
`

const ProjectCard = ({ containerRef, data, color }) => {
  const [showState, setState] = useState(1)
  const boxRef = useRef()
  const [store, dispatch] = useContext(PageState_Context)
  const calc = (x, y) => {
    const con = boxRef.current.getBoundingClientRect()
    return [
      -(y - con.top - con.height / 2) / 20,
      (x - con.left - con.width / 2) / 20,
      1.1,
    ]
  }
  const calcCenter = () => {
    const isMobile = window.innerWidth < 900
    const rect = boxRef.current.getBoundingClientRect()
    const tx = window.innerWidth / 2 - (rect.width / 2 + rect.left)
    const ty = true
      ? window.innerHeight / 2 - (rect.bottom - rect.height / 2)
      : window.innerHeight - rect.bottom + -(window.innerHeight / 5)
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
    if (store.view) {
      setState(store.view.index === data.index ? 2 : 0)
    }
    if (showState === 2) {
      setClick(calcCenter())
    }
    if (Object.keys(store.view).length === 0) {
      setState(1)
      setClick({ xy: [0, 0] })
    }
  }, [store.view, showState])

  useEffect(() => {
    const backgroundNode = document.querySelector(".scean2_Background")
    if (showState === 2) {
      backgroundNode.style.opacity = 0
    } else {
      if (backgroundNode.style.opacity < 0.1) {
        backgroundNode.style.opacity = 1
      }
    }
  }, [showState])

  return (
    <animated.div
      style={{ transform: clickAnimation.xy.interpolate(centerTrans) }}
    >
      <CardContainer
        animate
        ring={data.color}
        onMouseMove={({ clientX: x, clientY: y }) => set({ xys: calc(x, y) })}
        onMouseLeave={() => set({ xys: [0, 0, 1] })}
        onClick={e => {
          e.preventDefault()
          const wrapperRec = document
            .getElementsByClassName("Apps_Wrapper")[0]
            .getBoundingClientRect()
          const windowCenter = window.innerHeight / 2
          window.scrollTo({
            top:
              wrapperRec.top +
              wrapperRec.height / 2 -
              windowCenter +
              window.scrollY,
            behavior: "smooth",
          })
          //
          dispatch({ type: "SET_VIEW", input: data })
        }}
        alignItems="center"
        width="100%"
        p="1em"
        showState={showState}
        className="activeIcon"
        style={{
          backgroundColor: color,
          zIndex: showState === 2 ? 99 : 0,
          color: "black",
          willChange: "transform",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          lineHeight: "1em",
          fontSize: ".8em",
          borderRadius: "8px",
          position: "relative",
          transform: hoverAnimation.xys.interpolate(trans),
          cursor: "pointer",
          boxShadow: " 0px 10px 30px -5px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Box
          p="1em"
          className="imgBox"
          ref={boxRef}
          style={{
            flexBasis: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gridArea: "space1",
            backgroundColor: showState === 2 ? "transparent" : "black",
            borderRadius: "11px",
            transition: "backgroundColor .7s linear",
          }}
        >
          <CardImage
            style={{
              width: "5em",
            }}
            src={data.logo}
          />
        </Box>
        <Heading
          m="1em"
          style={{
            background: "rgb(2, 5, 25)",
            color: "white",
            borderRadius: "3px",
            transition: "transform 0.6s",
          }}
          fontSize={["1em"]}
        >
          {data.title}
        </Heading>
      </CardContainer>
    </animated.div>
  )
}

const Projects = ({ key, setHeading }) => {
  const [store, dispatch] = useContext(PageState_Context)
  const ref = useRef()

  // if (Object.entries(activeView).length > 0) {
  //   setHeading(false)
  // } else {
  //   setHeading(true)
  // }

  const Chance = chance()
  const colors = [
    "rgba(133, 220, 190,.6)",
    "rgba(65, 178, 163,.6)",
    "rgba(85, 61, 103,.6)",
    "rgba(246, 76, 114.6)",
    "rgba(252, 68, 69.6)",
    "rgba(202, 250, 254.6)",
  ]

  return (
    <Container
      className="projectContainer"
      ref={ref}
      key={key}
      animate
      p={"10%"}
      type="Grid"
      gridTemplateAreas={[`"1fr 1fr"`, `"1fr 1fr 1fr"`]}
      style={{
        width: "100%",
        gridGap: "2em",
        willChange: "opacity",
      }}
    >
      <Viewer store={store} dispatch={dispatch} />
      {projectData.map((data, i) => {
        const color = colors[Chance.integer({ min: 0, max: colors.length - 1 })]
        return (
          <ProjectCard
            color={""}
            containerRef={ref}
            // handleClick={setView}
            key={i}
            data={{ index: i, ...data }}
          />
        )
      })}
    </Container>
  )
}

export default React.memo(Projects)
