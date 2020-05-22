import _ from "lodash"
import Icon from "../elements/icons"
import chance from "chance"
import { useObserver, buildThresholdList, useToggle } from "../util"
import { useSpring, animated, config, useSprings } from "react-spring"
import styled from "styled-components"
import React, { useEffect, useContext, useState, useReducer } from "react"
import { PageState_Context } from "./context"
const AboutStyles = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  background: black;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 1) 7%,
    rgba(0, 0, 0, 0.6676664086687307) 20%,
    rgba(0, 0, 0, 0) 43%,
    rgba(0, 0, 0, 0.6274187306501549) 58%,
    rgba(0, 0, 0, 0.7326818885448916) 70%,
    rgba(0, 0, 0, 0.8781927244582043) 81%,
    rgba(0, 0, 0, 0.872000773993808) 96%
  );

  /* box-shadow: 2px 0px 47px 24px rgba(0, 0, 0, 0.75); */
  p {
    max-width: 500px;
    margin: 0;
    padding: 15px;
    background: #0000000a;
    backdrop-filter: blur(3px);
    letter-spacing: 4px;
  }
`

const Line = animated(styled.div`
  height: 16px;
  background-color: #b90000;
  width: "400px";
  transition: 0.7s cubic-bezier(0.165, 0.84, 0.44, 1);
  transform: ${({ show, index }) => {
    if (show) return "translate(0px,0px)"
    else return `translate(0px,${index % 2 === 1 ? "-50" : "50"}px)`
  }};

  width: ${({ show }) => (show ? "100%" : "0%")};
`)

const TechIcons = React.memo(({ show }) => {
  const iconList = ["react", "rust", "docker", "node", "vim", "git"]

  const colors = [
    "#85DCBE",
    "#C38D9E",
    "#41B2A3",
    "#553D67",
    "#f64C72",
    "#FC4445",
    "#CAFAFE",
  ]

  const springs = useSprings(
    iconList.length,

    iconList.map((name, i) => {
      if (window) {
        const paddingX = window.innerWidth / 2
        const paddingY = window.innerHeight / 2

        const Chance = chance()
        let x = Chance.integer({ min: 100, max: paddingX })
        let y = Chance.integer({ min: 100, max: paddingY })
        let rotation = Chance.integer({ min: 0, max: 360 })
        const color = colors[Chance.integer({ min: 0, max: colors.length - 1 })]

        const o = Chance.floating({ min: 0.5, max: 0.9 })
        const scale = Chance.floating({ min: 1, max: 2.5 })
        const plusOrMinus = num => (Math.random() < 0.5 ? -num : num)

        return {
          reverse: !show,
          from: {
            transform: `translate(0px,0px) scale(1) rotate(3deg) `,
            color: "#000000",
            opacity: 0,
          },
          to: {
            transform: `translate(${plusOrMinus(x)}px,${plusOrMinus(
              y
            )}px)  scale(${scale}) rotate(${i * 10}deg) `,
            color: color,
            opacity: o,
          },
        }
      }
    })
  )

  return springs.map((props, i) => (
    <animated.div
      style={{ ...props, left: "50%", top: "50%", position: "absolute" }}
    >
      <Icon size="60px" type={iconList[i]} />
    </animated.div>
  ))
})

export const About = React.memo(() => {
  const [ref, entries] = useObserver({ threshold: buildThresholdList(40) })
  const [show, toggle] = useToggle(false)
  const [store, dispatch] = useContext(PageState_Context)

  const { transform, opacity } = useSpring(
    show
      ? {
          transform: `translate(0,0px)`,
          opacity: 1,
        }
      : {
          transform: `translate(0,300px)`,
          opacity: 0,
          config: config.molasses,
        }
  )

  useEffect(() => {
    const ir = entries.intersectionRatio

    if (entries.intersectionRatio) {
      if (ir > 0.6 && !show) {
        toggle()
      }
      if (ir < 0.6 && show) {
        toggle()
      } else {
      }
    }
  }, [entries])

  useEffect(() => {
    if (show && store.active !== "about") {
      dispatch({ type: "SET_ACTIVE", input: "about" })
    }
  }, [show])

  return (
    <AboutStyles ref={ref}>
      <animated.div
        style={{
          opacity,
          transform,
          position: "relative",
        }}
      >
        <TechIcons show={show} />
        <Line index={1} show={show} />
        <p>
          Big on design and lightning fast code. Found my love for JS developing
          on Node , leveraging the power of Non-Blocking I/O and npm’s rich
          package eco system. Out of necessity I first started learning web
          development in college when I started my first business selling
          clothing online through an e-commerce website. I have since learned
          more advanced techniques building tools for lead generation and
          business productivity.
        </p>
        <Line index={2} show={show} />
      </animated.div>
    </AboutStyles>
  )
})
