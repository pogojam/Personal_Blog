import React, { useState } from "react"
import { Link } from "gatsby"
import { Button, Flex, Card, Box } from "rebass"

const pages = ["index", "blog", "projects"]

const NaveButton = ({ name, index }) => (
  <Link to={"/" + name}>
    <Button>{name}</Button>
  </Link>
)

const Container = ({ children }) => (
  <Flex
    flexDirection="column"
    mt="auto"
    mb="auto"
    style={{ minHeight: "100%" }}
    width={[1 / 6]}
  >
    {children}
  </Flex>
)

const buildButtons = (pages, handleClick) =>
  pages.map((e, i) => (
    <Button index={i} key={e + i}>
      {e}
    </Button>
  ))

const buttons = []

const Nav = () => <Container>{buildButtons(pages)}</Container>

export default Nav
