import styled from "styled-components"
import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { useSprings, animated, useSpring, useTransition } from "react-spring"
import Icon from "./elements/icons"
import { FiBook } from "react-icons/fi"

const MainButton = styled.button``

const pages = [
  { path: "/", name: "Home" },
  { path: "/blog", name: "Blog", Icon: FiBook },
]

const NavStyles = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  padding: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.7em;
  backdrop-filter: blur(10px);
  background-color: #a3dae685;
  border-bottom-left-radius: 3px;
  & > * {
    margin-left: 20px;
  }
`

const Nav = params => {
  return (
    <NavStyles>
      <Icon type="linkedin" />
      <Icon type="git" />
    </NavStyles>
  )
}

export default Nav
