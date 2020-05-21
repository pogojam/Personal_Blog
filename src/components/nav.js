import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { Button, Flex, Card, Image, Box, Heading, Text } from "rebass"
import { useSprings, animated, useSpring, useTransition } from "react-spring"
import { Icon } from "./elements/icons"
import { MdPhonelinkRing, MdEmail } from "react-icons/md"
import { FiBook } from "react-icons/fi"
import Container from "./container"
import Logo from "../static/images/logo.svg"
import styled from "styled-components"

const WrappedButton = animated(Box)

const pages = [
  { path: "/", name: "Home" },
  { path: "/blog", name: "Blog", Icon: FiBook },
]

const NavButton = ({ name, Icon, path, animation, ...props }) => (
  <Link to={path} style={{ textDecoration: "none" }}>
    <WrappedButton
      my=".5em"
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        ...animation,
      }}
      fontFamily={'"Monoton", cursive !important'}
      {...props}
    >
      {path !== "/" ? (
        <>{name}</>
      ) : (
        <Image
          style={{
            position: "fixed",
            top: "10px",
            left: "10px",
            width: "40px",
          }}
          src={
            "https://res.cloudinary.com/dxjse9tsv/image/upload/v1585001996/Logos/personal_logo.png"
          }
        />
      )}
    </WrappedButton>
  </Link>
)

const buildButtons = (pages, animation) => {
  return pages.map((e, i) => (
    <NavButton
      animation={{ color: "white" }}
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
        display: "none",
      }}
    />
  )
}

const Contact_Container = styled(Box)`
  opacity: 0.4;

  width: 50%;

  @media (maxwidth: 900px) {
    width: 100%;
  }

  &:hover {
    opacity: 1;
  }
  transition: opacity 1s linear;
`

const Contact = animation => {
  return (
    <Contact_Container
      p=".8em"
      style={{
        fontSize: "1em",
        alignItems: "center",
        position: "fixed",
        bottom: 0,
        right: 0,
        height: "1em",
        borderTop: "1px solid black",
        borderLeft: "1px solid  black",
        boxShadow: "rgba(29, 26, 26, 0.82) -5px 23px 30px 3px",
        display: "flex",
        justifyContent: "space-around",
        borderTopLeftRadius: "3px",
        color: "black",
        animation,
      }}
    >
      <Text style={{ justifyContent: "space-between" }}>Ryan Breaux</Text>
      <Text
        style={{
          alignItems: "center",
        }}
      >
        rlb278@icloud.com{" "}
        <MdEmail style={{ transform: "translate(30%,15%)" }} />{" "}
      </Text>
      <Text
        style={{
          alignItems: "center",
        }}
      >
        928-600-4952{" "}
        <MdPhonelinkRing style={{ transform: "translate(30%,15%)" }} />{" "}
      </Text>
    </Contact_Container>
  )
}

const Nav = ({ animation, avatar = true }) => {
  const navRef = useRef(null)
  return (
    <animated.div
      id="Nav"
      style={{
        overflow: "hidden",
        zIndex: 999,
        boxShadow: "rgba(0, 0, 0, 0.3) 0px 8px 22px -5px",
        borderRight: "0px",
        borderTop: "0px",
        width: "5%",
        minWidth: "66px",
        maxWidth: "75px",
        position: "fixed",
        right: 0,
        top: 0,
        backgroundColor: "rgb(64, 64, 64)",
        // height: animation ? animation.height : "3em",
        willChange: "height transform",
        display: "flex",
        flexDirection: "column",
        borderBottomLeftRadius: "3px",
        fontFamily: ' "Gruppo", cursive',
        fontWeight: 900,
      }}
    >
      <Flex justifyContent="center" ref={navRef}>
        {buildButtons(pages, animation)}
      </Flex>
      <Box m=".5em" style={{ borderTop: "1px solid white" }} />
      {avatar && (
        <Avatar
          animation={animation}
          link="https://res.cloudinary.com/dxjse9tsv/image/upload/v1573081599/ryansWebsite/ryansWebsite_Selfi_B_W_Center-removebg-preview.png"
        />
      )}
      {/* <Icon
        linkedin="https://linkedin.com/in/ryan-breaux-4603396a"
        github="https://github.com/pogojam"
        size="1.3em"
        color="white"
        subStyle={{ marginTop: "5px", marginBottom: "5px" }}
        style={{
          display: "flex",
          zIndex: 9999,
          flexDirection: "column",
          alignItems: "center",
        }}
      /> */}

      {/* <animated.div>{<Contact animation={animation} />}</animated.div> */}
    </animated.div>
  )
}

export default Nav
