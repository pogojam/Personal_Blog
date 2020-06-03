import React from "react"
import { useSpring, animated } from "react-spring"
import styled from "styled-components"

export const LoadingScreen = ({ progress }) => {
  return (
    <animated.div
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        zIndex: 99999,
        background: "rgb(46,38,54)",
      }}
    ></animated.div>
  )
}
