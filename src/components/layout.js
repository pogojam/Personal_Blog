import { RecoilRoot } from "recoil"
import React from "react"
import PropTypes from "prop-types"
import { Nav_Animation } from "./animations"
import { pipe } from "./util"
import Nav from "./nav"
import { Flex, Box } from "rebass"
import "./layout.css"
import Background from "./interface/background"
// import Splash from "./elements/splash"

const Layout = ({ children, navAnim = true, ...props }) => {
  const LayoutNav = navAnim ? pipe(Nav)(Nav_Animation) : Nav
  return (
    <Box style={{ overflow: "hidden" }}>
      <RecoilRoot>
        <Flex
          id="MainContainer"
          flexDirection="column"
          {...props}
          style={{ ...props.style }}
        >
          <Background />
          <LayoutNav />
          <Box>{children}</Box>
        </Flex>
      </RecoilRoot>
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
