import styled from "styled-components"
import React, { useState, useEffect } from "react"
import { Box } from "rebass"

const Background = styled(Box)`
  transform: ${({ status }) =>
    status ? "translateX(0%)" : "translateX(-100%)"};
`

const inital_state = [true]

const Splash = props => {
  const [state, setState] = useState(inital_state)

  return (
    <Background
      bg="brown"
      status={state[0]}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
        display: "none",
      }}
    ></Background>
  )
}

export default Splash
