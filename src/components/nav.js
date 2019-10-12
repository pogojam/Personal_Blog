import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { Button, Flex, Card, Image, Box, Heading, Text } from "rebass"
import { useSprings, animated, useSpring, useTransition } from "react-spring"
import Logo from "../static/images/logo.svg"

const WrappedButton = animated(Button)

const pages = [{ path: "/", name: "Home" }, { path: "/blog", name: "Blog" }]

const NavButton = ({ name, path, animation, ...props }) => (
  <Link to={path}>
    <WrappedButton
      style={{ cursor: "pointer", fontWeight: 100, ...animation }}
      {...props}
    >
      {path !== "/" ? name : <Image src={Logo} />}
    </WrappedButton>
  </Link>
)

const buildButtons = (pages, animation) => {
  return pages.map((e, i) => (
    <NavButton
      animation={{ color: animation.buttonColor }}
      bg="transparent"
      key={e.name + i}
      {...e}
    />
  ))
}

const Nav = ({ animation, Viewer }) => {
  const navRef = useRef(null)
  return (
    <animated.div
      style={{
        zIndex: 999,
        width: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        borderBottom: "1px solid",
        backgroundColor: animation.backgroundColor,
        height: animation.height,
      }}
    >
      <Flex alignItems="center" ref={navRef}>
        {buildButtons(pages, animation)}
      </Flex>
      {Viewer && <Viewer />}
    </animated.div>
  )
}

export default Nav
