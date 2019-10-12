import React from "react"
import PropTypes from "prop-types"
import { Nav_Animation } from "./animations"
import { pipe } from "./util"
import Nav from "./nav"
import { Flex, Box } from "rebass"
import "./layout.css"

const LayoutNav = pipe(Nav)(Nav_Animation)

const Layout = ({ children, ...props }) => {
  return (
    <>
      <Flex
        ml={"10%"}
        mr={"10%"}
        flexDirection="column"
        {...props}
        style={{ minHeight: "100vh", ...props.style }}
      >
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
