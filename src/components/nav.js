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

const NavStyles = animated(styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.7em;
  backdrop-filter: blur(10px);
  background-color: #0affc685;
  border-bottom-left-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-right: 20px;

  & > * {
    margin-left: 20px;
  }
  svg {
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    background: #bcbdd04f;
    padding: 4px;
    outline: none;
    border: 1px solid black;
    border-radius: 5px;
    transition: 0.2s linear;
    &:hover {
      background-color: #48cc7d54;
      border: 1px solid #6e8e9c;
    }
  }
`)

const Nav = params => {
  const onLoad = useSpring({
    from: {
      transform: `translate(100%)`,
    },
    to: {
      transform: `translate(0%)`,
    },
  })
  return (
    <NavStyles style={onLoad}>
      <button>
        <Icon type="linkedin" />
      </button>

      <button>
        <Icon type="git" />
      </button>
    </NavStyles>
  )
}

export default Nav
