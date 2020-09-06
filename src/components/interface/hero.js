import React, { useState, useEffect, useContext, useRef } from "react"
import { PageState_Context } from "./context"
import styled from "styled-components"
import { animated, useSpring } from "react-spring"
import { useObserver, buildThresholdList} from "../util"
import { useWindowSize } from '@react-hook/window-size'
import { useScroll, useHover } from "react-use-gesture"
import _ from "lodash"
import { detect } from "detect-browser"
import useMobileDetect from "use-mobile-detect-hook"

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

const BackgroundStyle = animated(styled.img`
  background-color: black;
  background-position: center;
  background-size: cover;
  object-fit: cover;
  filter: ${({ isUnsupported }) => (isUnsupported ? "" : 'url("#water")')};
  /* z-index: 1; */
  position: absolute;
  width: 100%;
  height:${({height})=>height+'px'};
  top: 0;
  border-radius: 11%;
  z-index: 10;
`)

const Background = ({ incrementLoad }) => {
  const [{ x, scale, opacity }, setAnim] = useSpring(() => ({
    scale: [0.5, 0, 0],
    opacity: [1],
    config: { tension: 500, friction: 100 },
  }))

  const [ref, entries] = useObserver({
    threshold: buildThresholdList(40),
    rootMargin: "0px 0px 0px 0px",
  })
  const [windowWidth,windowHeight]= useWindowSize()
  const [store, dispatch] = useContext(PageState_Context)
  const globalID = "hero"
  const browser = detect()
  const isIOS = browser.name === "ios"
  const isSafari = browser.name === "safari" || browser.name === "ios"
  const isMobile =
    typeof window === "undefined" ? true : window.innerWidth < 600
  const bgRef = useRef()

  useEffect(() => {
    if (entries.intersectionRatio && window) {
      const offset = 0
      const skew = window.innerHeight * 0.7
      const ir = entries.intersectionRatio
      // const yVal = isIOS ? 0 : _.clamp(skew / ir - skew, 0, skew)

      const yVal = isMobile ? 0 : _.clamp(skew / ir - skew, 0, skew)
      const scaleVal = _.clamp(1 * ir, 0, 0.5)
      // const scaleVal = 1
      // const opacityVal = ir < 0.38 ? 0 : 1
      const opacityVal = ir
      setAnim({ scale: [scaleVal, yVal + offset, 0], opacity: opacityVal })

      if (ir > 0.2 && store.active !== globalID) {
        dispatch({ type: "SET_ACTIVE", input: globalID })
      }
    }
  }, [entries])

  useEffect(() => {
    // bgRef.current.setAttribute("playsinline", true)
    // bgRef.current.play()
  }, [])
  return (
    <>
      {browser.name && (
        <BackgroundStyle
        height={windowHeight}
          src={
            "https://res.cloudinary.com/dxjse9tsv/image/upload/v1554688348/pexels-photo-29642.jpg"
          }
          ref={bgRef}
          onLoad={() => incrementLoad()}
          isUnsupported={
            browser.name === "safari" || browser.name === "ios" || isMobile
          }
          // autoPlay
          // muted
          // loop
          // src={
          //   isSafari || detectMobile.isMobile()
          //     ? "https://res.cloudinary.com/dxjse9tsv/video/upload/v1590188966/video/Pexels_Videos_2792370.mp4"
          //     : "https://res.cloudinary.com/dxjse9tsv/video/upload/v1590188966/video/Pexels_Videos_2792370.mp4"
          // }
          style={{
            willChange: "transform opacity",
            transform: scale.interpolate(
              (s, y, x) => `scale(${s}) translate(${x}px,${y}px) `
            ),
            opacity,
          }}
        />
      )}
      <div
        ref={ref}
        style={{
          width: "100%",
          height: windowHeight,
          top: 0,
          position: "absolute",
        }}
      />
    </>
  )
}

const Styles = styled.div`
  position: absolute;
  overflow: hidden;
  color: white;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;

  @media (min-width: 600px) {
    overflow-x: hidden;
  }

  .Caption {
    width: 68%;
    z-index: 99;
  }
  #BackgroundCanvas {
    height: 100%;
    position: relative;
  }
`

export const Hero = props => {
  return (
    <Styles>
      <Background {...props} />
      <div id="BackgroundCanvas" />
      <Ripple />
    </Styles>
  )
}
