import { Card, Flex, Box } from "rebass"
import React from "react"
import _ from "lodash"
import { useSpring, animated } from "react-spring"

const types = { Card, Box, Flex }

const attachRef = (Element, props) =>
  React.forwardRef((props, ref) => {
    return <Element {...props} children={props.children} ref={ref} />
  })

const setBaseElement = type => {
  const keys = Object.keys(types)
  return keys.reduce((acc, k, i) => {
    if (k === type) {
      return (acc = types[k])
    } else {
      return acc
    }
  }, Box)
}

const Container = ({ animate, type, children, ...props }) => {
  let Output = setBaseElement(type)

  if (animate) {
    Output = animated(Output)
  }

  Output = attachRef(Output, props)

  return <Output children={children} {...props} />
}

export default Container
