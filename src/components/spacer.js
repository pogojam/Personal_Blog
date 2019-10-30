import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { Flex } from "rebass"

const subscriptionList = []

const isSubscribed = name =>
  subscriptionList.reduce(
    (acc, e) => (e.name === name ? (acc = true) : (acc = false)),
    false
  )

// const updateBoundingRect = space => {
//   subscriptionList.map(e => {
//     !e.client
//   })
// }

const setSpace = (name, ref) => {
  const data = {
    ref,
    name,
    client: ref.current && ref.current.getBoundingClientRect(),
  }

  if (!isSubscribed(name)) subscriptionList.push(data)
}

const sizes = name =>
  subscriptionList.map(e => {
    if (e.name === name) return e.client
  })

const useSpace = (space, ref) => {
  return [setSpace, sizes]
}
export default useSpace
