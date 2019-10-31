import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { Button, Flex, Card, Image, Box, Heading, Text } from "rebass"
import { useSprings, animated, useSpring, useTransition } from "react-spring"
import { Icon } from "./elements/icons"
import Container from "./container"
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
      animation={{ color: animation ? animation.buttonColor : "white" }}
      bg="transparent"
      key={e.name + i}
      {...e}
    />
  ))
}

const Avatar = ({ link, animation }) => {
  return (
    <Container
      animate
      style={{
        width: "11em",
        height: "10em",
        background: `url(${link})`,
        backgroundSize: "cover",
        marginLeft: "auto",
        position: "absolute",
        right: 0,
        top: "-35px",
        opacity: animation ? animation.avatarOpacity : 0,
      }}
    />
  )
}

const Nav = ({ animation, avatar = true }) => {
  const navRef = useRef(null)
  return (
    <animated.div
      style={{
        overflow: "hidden",
        zIndex: 999,
        width: "100%",
        position: "fixed",
        left: 0,
        top: 0,
        borderBottom: "1px solid",
        backgroundColor: animation ? animation.backgroundColor : "black",
        height: animation ? animation.height : "3em",
        willChange: "height",
        display: "flex",
      }}
    >
      <Flex alignItems="center" ref={navRef}>
        {buildButtons(pages, animation)}
      </Flex>
      {avatar && (
        <Avatar
          animation={animation}
          link="https://res.cloudinary.com/dxjse9tsv/image/upload/v1555035590/ryansWebsite/Selfi_B_W.jpg"
        />
      )}
      <Icon
        linkedin="https://linkedin.com/in/ryan-breaux-4603396a"
        github="https://github.com/pogojam"
        size="1.3em"
        color="white"
        ml="auto"
        mr="1em"
        style={{ display: "flex", zIndex: 9999, alignItems: "center" }}
        space="1em"
        subStyle={{ marginLeft: "1em" }}
      />
    </animated.div>
  )
}

export default Nav
