import React from "react"
import PropTypes from "prop-types"
import { Nav_Animation } from "./animations"
import { pipe } from "./util"
import Nav from "./nav"
import { Flex, Box } from "rebass"
import "./layout.css"
import Background from "./interface/background"

const Layout = ({ children, navAnim = true, ...props }) => {
  const LayoutNav = navAnim ? pipe(Nav)(Nav_Animation) : Nav
  return (
    <>
      <Flex
        id="MainContainer"
        ml={"10%"}
        mr={"10%"}
        flexDirection="column"
        {...props}
        style={{ minHeight: "100vh", ...props.style }}
      >
        <Background />
        <LayoutNav />
        <Box>{children}</Box>
      </Flex>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
