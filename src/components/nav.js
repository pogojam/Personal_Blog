import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import { Button, Flex, Card, Box } from "rebass"
import { useSprings, animated } from "react-spring"
import { TiHome } from "react-icons/ti"
import useSpace from "./spacer"

const pages = [
  { path: "/", name: "Home" },
  { path: "/blog", name: "Blog" },
  { path: "/stack", name: "Stack" },
]

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
  console.log(springs)
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

  const [setSpace, sizes] = useSpace()

  useEffect(() => {
    setSpace("nav", navRef)
    console.log(navRef)
  })

  return (
    <div ref={navRef}>
      <Container ref={navRef} p="1em">
        {buildButtons(pages)}
      </Container>
    </div>
  )
}

export default Nav
