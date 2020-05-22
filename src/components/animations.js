import React, { useEffect, useState } from "react"
import { useSpring } from "react-spring"
import useCustom from "./useCustom"
import useSpace from "./spacer"

export const setAnimation = anim => {
  const { transform, rotate, fadeIn, scean2, expand, proj, size } = anim
  return {
    slideIn: (directionX = 1, directionY = 1) => {
      return {
        transform:
          transform &&
          transform.interpolate((x, y) => {
            return `translate3d(${x * directionX}px,${y * directionY}px,0px)`
          }),
      }
    },
    fadeIn: speed => ({
      opacity: fadeIn && fadeIn.interpolate(e => Math.pow(e, speed)),
    }),
    rotate: {
      transform:
        rotate &&
        rotate.interpolate((x, y, z, e) => {
          return `rotate3d(${x},${Math.pow(y, 2)},${z},${e}deg)`
        }),
    },
    expand: {
      transform: expand && expand.interpolate(e => `scale(${e})`),
    },
    size: ([min, max, unit]) => {
      return { maxWidth: size && size.interpolate(e => min + e * max + unit) }
    },
    proj:
      proj &&
      proj.interpolate(x => {
        return x
      }),
    scean2: {
      transform:
        scean2 &&
        scean2.interpolate(
          e =>
            `rotate(${e *
              -40}deg) matrix3d(1, 0, 0, 0, 2, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)`
        ),
    },
  }
}

export const Nav_Animation = Nav => props => <NavContent {...props} Nav={Nav} />

function NavContent({ animation, Nav, ...props }) {
  const [isTop, setTop] = useState(true)

  const topScroll = useSpring({
    from: {
      height: "7em",
      avatarOpacity: "1",
    },
    to: isTop
      ? [
          {
            height: "0em",
          },
          { avatarOpacity: "1" },
        ]
      : [
          { avatarOpacity: "0" },
          {
            buttonColor: "black",
            height: "3em",
          },
        ],
  })

  const [button, setButton] = useSpring(() => ({
    slideIn: [0, 0],
  }))

  useEffect(() => {
    const offsetY = 20
    document.onscroll = e => {
      if (window.scrollY > offsetY) {
        setTop(false)
      }
      if (window.scrollY < offsetY) {
        setTop(true)
      }
    }
    return () => {
      window.onscroll = null
    }
  }, [isTop])

  return <Nav {...props} animation={{ ...topScroll, ...animation }} />
}
