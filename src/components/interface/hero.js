import React, { useState, useEffect } from "react"
import { activeSectionState } from "../atoms/atoms"
import { useMove, useScroll } from "react-use-gesture"
import { Claw1, Claw2 } from "../../static/claw"
import styled from "styled-components"
import { animated, useSpring } from "react-spring"
import { useObserver, buildThresholdList } from "../util"
import BackgroundCanvas from "./background"
import _ from "lodash"
import { useRecoilValue, useRecoilState } from "recoil"

const BackgroundStyle = animated(styled.div`
  background: url("https://res.cloudinary.com/dxjse9tsv/image/upload/v1590101077/apple-background-desk-electronics-399161.jpg");
  background-size: cover;
  filter: url("#water");
  position: absolute;
  width: 100%;
  height: 117vh;
  top: 0%;
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

const Background = () => {
  const [{ x, scale, opacity }, setAnim] = useSpring(() => ({
    scale: [1, 0],
    opacity: [1],
  }))

  const [ref, entries] = useObserver({
    threshold: buildThresholdList(40),
    rootMargin: "0px 0px 0px 0px",
  })

  if (entries.intersectionRatio) {
    const offset = window.innerHeight * 0.7
    const ir = entries.intersectionRatio
    const yVal = _.clamp(offset / ir - offset, 0, offset)
    const scaleVal = _.clamp(ir + 0.2, 0.5, 1.2)
    const opacityVal = ir < 0.38 ? 0 : 1
    console.log(yVal)
    console.log(ir)
    setAnim({ scale: [scaleVal, yVal], opacityVal })
  }

  return (
    <>
      <BackgroundStyle
        style={{
          transform: scale.interpolate(
            (s, y) => `scale(${s}) translate(0px,${y}px) `
          ),
          opacity,
        }}
      >
        {/* <Claw1 index={2} className={"Claw"} />
      <Claw2 className="Claw" /> */}
      </BackgroundStyle>
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "100vh",
          top: 0,
          position: "absolute",
        }}
      />
    </>
  )
}

const Background2_Styles = styled.div`
  background: url("https://res.cloudinary.com/dxjse9tsv/image/upload/v1554688348/pexels-photo-29642.jpg");
  background-size: cover;
  filter: url("#water");
  position: absolute;
  width: 100%;
  height: 117vh;
  position: absolute;
  transition: opacity 1s linear;
  opacity: ${({ show }) => (show ? 1 : 0)};
  bottom: 0;
`
const Background2 = () => {
  const [show, setShow] = useRecoilState(activeSectionState)
  const globalID = "about"
  console.log(show, "BACKGROUND HERO")

  return <Background2_Styles show={show === globalID}></Background2_Styles>
}

const Styles = styled.div`
  position: absolute;

  color: white;
  background: black;
  height: 270vh;
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
  return (
    <Styles>
      <Background />
      <Background2 />
      <div id="BackgroundCanvas" />
      <Ripple />
    </Styles>
  )
}
