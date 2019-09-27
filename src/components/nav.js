import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { Button, Flex, Card, Box } from "rebass"
import { useSprings, animated, useSpring } from "react-spring"
import { TiHome } from "react-icons/ti"
import useCustom from "./useCustom"
import useSpace from "./spacer"

const pages = [
  { path: "/", name: "Home" },
  { path: "/blog", name: "Blog" },
  { path: "/stack", name: "Stack" },
]



const hover = {
  projects:[]
}

const NavButton = ({ name, path, ...props }) => (
  <Link to={path}>
    <Button {...props}>{path !== "/" ? name : <TiHome />}</Button>
  </Link>
)

const Container = ({ children, ...props }) => <Flex {...props}>{children}</Flex>

const buildButtons = (pages, handleClick) => {
  const [springs, set, stop] = useSprings(pages.length, index => ({
    opacity: 1,
  }))
  return pages.map((e, i) => (
    <NavButton
      bg="transparent"
      color="black"
      style={{ ...springs[i] }}
      key={e.name + i}
      {...e}
    />
  ))
}

const Nav = () => {
  const navRef = useRef(null)
  const [scean, setScean] = useCustom()


  const [animation, setAnim] = useSpring(() => {
    return {
      from: { transform: "translateY(-300px)" },
      to: { transform: "translateY(0px)" },
    }
  })

  return (
    <animated.div style={{ position: "sticky", top: 0, ...animation }}>
      <Flex ref={navRef} p="1em">
        {buildButtons(pages)}
      </Flex>
      {scean && hover.projects[scean.project]}
    </animated.div>
  )
}

export default Nav
