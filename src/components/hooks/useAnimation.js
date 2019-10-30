import React, { useState, useEffect } from "react"
import { useSpring } from "react-spring"
import { generateKey } from "../util"
import { useCustom } from "./useCustom"

const setAnimation = anim => {
  const { transform, rotate, fadeIn, expand, proj, size } = anim
  return {
    slideIn: (directionX = 1, directionY = 1) => {
      return {
        transform: transform.interpolate((x, y) => {
          return `translate3d(${x * directionX}px,${y * directionY}px,0px)`
        }),
      }
    },
    fadeIn: speed => ({
      opacity: fadeIn.interpolate(e => Math.pow(e, speed)),
    }),
    rotate: {
      transform: rotate.interpolate((x, y, z, e) => {
        return `rotate3d(${x},${Math.pow(y, 2)},${z},${e}deg)`
      }),
    },
    expand: {
      transform: expand.interpolate(e => `scale(${e})`),
    },
    size: ([min, max, unit]) => {
      return { maxWidth: size.interpolate(e => min + e * max + unit) }
    },
    proj: proj.interpolate(x => {
      return x
    }),
  }
}

const connectSpring = (input, func) => {
  const [animation, set] = useSpring({
    fade: [0],
    width: [0, 0, "px"],
    height: [0, 0, "px"],
    rotate: [0, 0, "deg"],
    transform: [0, 0, 0, 0],
  })

  return
}

const connectState = set => mode => subscribers => set({ mode, subscribers })

export const useAnimation = ref => {
  const [global, setGlobal] = useCustom()
  const [state, setLocalState] = useState()

  useEffect(() => {
    if (state.mode) {
      useState({
        id: generateKey(Math.random()),
        ref,
      })
    }
  }, [])

  return [connectState(setLocalState), animations]
}
