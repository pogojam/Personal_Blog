import { RecoilRoot, useRecoilValue, useRecoilState } from "recoil"
import { animated, useSpring } from "react-spring"
import React from "react"
import PropTypes from "prop-types"
import { Nav_Animation } from "./animations"
import { pipe } from "./util"
import Nav from "./nav"
import { Flex, Box } from "rebass"
import "./layout.css"
import { useScroll, useWheel, useHover } from "react-use-gesture"

import Background from "./interface/background"
import useSpace from "./spacer"
// import Splash from "./elements/splash"

const BackgroundDirections = {
  downRight: v => [
    { polarity: "-", side: "y", velocity: v[0] * 0.001 },
    { polarity: "+", side: "x", velocity: v[1] * 0.001 },
  ],
  downLeft: v => [
    { polarity: "-", side: "y", velocity: v[0] * 0.001 },
    { polarity: "-", side: "x", velocity: v[1] * 0.001 },
  ],
  upLeft: v => [
    { polarity: "+", side: "y", velocity: v[0] * 0.001 },
    { polarity: "-", side: "x", velocity: v[1] * 0.001 },
  ],
  upRight: v => [
    { polarity: "+", side: "y", velocity: v[0] * 0.001 },
    { polarity: "+", side: "x", velocity: v[1] * 0.001 },
  ],
}

function Layout({ children, navAnim = true, ...props }) {
  return (
    <RecoilRoot>
      <Box style={{ overflow: "hidden" }}>
        <Flex
          id="MainContainer"
          flexDirection="column"
          {...props}
          style={{ ...props.style }}
        >
          <Background />
          <Nav />
          <Box>{children}</Box>
        </Flex>
      </Box>
    </RecoilRoot>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
