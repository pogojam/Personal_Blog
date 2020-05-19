import React, { useState, useEffect } from "react"
import { useMove, useScroll } from "react-use-gesture"
import { Claw1, Claw2 } from "../../static/claw"
import styled from "styled-components"
import { animated, useSpring } from "react-spring"
import { Heading } from "../elements/heading"
import { useObserver, buildThresholdList } from "../util"
import BackgroundCanvas from "./background"
import _ from "lodash"

const BackgroundStyle = animated(styled.div`
  background: url("https://res.cloudinary.com/dxjse9tsv/image/upload/v1554688348/pexels-photo-29642.jpg");
  background-size: cover;
  filter: url("#water");
  position: absolute;
  width: 100%;

  height: 100%;

  .Claw {
    height: 100%;
    width: 160%;
    top: 0;
    position: absolute;
  }

  .BackgroundCanvas {
  }
`)

const AnimFeTurbulence = animated("feTurbulence")
const AnimFeDisplacementMap = animated("feDisplacementMap")

const Ripple = () => {
  const [open, toggle] = useState(false)
  const { freq, scale, transform, opacity } = useSpring({
    reverse: open,
    from: {
      scale: 10,
      opacity: 0,
      transform: "scale(0.9)",
      freq: "0.4, 0.0",
    },
    to: { scale: 150, opacity: 1, transform: "scale(1)", freq: "0.35, 0.3" },
    onRest: () => {
      console.log("object")
      toggle(!open)
    },
    config: { duration: 16000, tension: 1 },
  })

  return (
    <>
      <animated.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
        }}
      />
      <animated.svg viewBox="0 0 1278 446">
        <defs>
          <filter id="water">
            <AnimFeTurbulence
              type="fractalNoise"
              baseFrequency={freq}
              numOctaves={2}
              result="TURB"
              seed="20"
            />
            <AnimFeDisplacementMap
              xChannelSelector="R"
              yChannelSelector="G"
              in="SourceGraphic"
              in2="TURB"
              result="DISP"
              scale={scale}
            />
          </filter>
        </defs>
      </animated.svg>
    </>
  )
}

const Background = ({ size }) => {
  return (
    <BackgroundStyle
      style={{ transform: size.interpolate(s => `scale(${s})`) }}
    >
      {/* <Claw1 index={2} className={"Claw"} />
      <Claw2 className="Claw" /> */}
      <div id="BackgroundCanvas" />
      {/* <span
        style={{
          width: "100%",
          height: "100%",
          background: "#00000038",
          position: "absolute",
        }}
      /> */}
      <Ripple />
    </BackgroundStyle>
  )
}

const Styles = styled.div`
  position: absolute;

  color: white;
  background: black;
  height: 200vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
  overflow: hidden;

  .Caption {
    width: 68%;
    z-index: 99;
  }
`

export const Hero = ({ children }) => {
  const [{ x, scale }, setAnim] = useSpring(() => ({
    x: [0],
    scale: [1],
  }))

  const [ref, entries] = useObserver({
    threshold: buildThresholdList(40),
    rootMargin: "0px 0px 0px 0px",
  })

  if (entries) {
    const ir = entries.intersectionRatio
    console.log(_.clamp(ir, 0.6, 1))

    setAnim({ x: [ir], scale: [_.clamp(ir, 0.6, 1)] })
  }

  const fickerItems = []

  return (
    <Styles>
      <Background size={scale} />

      {/* <animated.div
        ref={ref}
        style={{
          transform: x.interpolate(e => `translate(0px,${e * 100}px)`),
          opacity: x.interpolate(e => e),
          position: "absolute",
          top: "0",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
        className="Caption"
      >
        <animated.div
          style={{
            transform: x.interpolate(e => `translate(${e * 20}px,${0}px)`),
          }}
        >
          <Heading>Ryan Breaux</Heading>
        </animated.div>
        <div>
          <animated.div
            style={{
              transform: x.interpolate(e => `translate(${e * 40}px,${0}px)`),
            }}
          >
            <Heading type="Sub">Front-End/Back-End Developer</Heading>
          </animated.div>
          <animated.div
            style={{
              transform: x.interpolate(
                e => `translate(${e * 100}px,${e * 0}px)`
              ),
            }}
          >
            <span
              style={{
                fontWeight: 900,
                letterSpacing: "3px",

                color: "blanchedalmond",
              }}
            >
              {" "}
              Curious and humble , full stack developer, entrepreneur.
            </span>
          </animated.div>
        </div>
      </animated.div>
      {children} */}
    </Styles>
  )
}
