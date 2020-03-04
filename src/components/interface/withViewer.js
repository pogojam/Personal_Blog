import React, { useEffect, useState, useLayoutEffect } from "react"
import Container from "../container"
import generateKey from "../util"
import useCustom from "../hooks/useCustom"
import { Text, Box, Heading, Image } from "rebass"
import { useSpring, useTransition, config, animated } from "react-spring"
import { Icon, Button } from "../elements/"
import ProjectData from "../../static/projects"
import { FiGlobe, FiBookmark, FiLock } from "react-icons/fi"
import { TiLockClosedOutline, TiLockOpenOutline } from "react-icons/ti"
import styled, { keyframes, css } from "styled-components"
import projects from "../../static/projects"

const animation_slowFadeIn = keyframes`
  from{
      opacity:1;
  }
  to{
    opacity:.6;
  }
`

const animation_slideIn = keyframes`
  from:{
    transition:translateX('')
  }
  to{

  }
`

const Lock = ({ state, props }) => {
  switch (state) {
    case "locked":
      return <FiLock {...props} />
      break
    case "open":
      return <div> </div>
      break
  }
}

const CircleButton = styled(Button)`
  position: relative;
  width: 3em;
  height: 3em;
  margin: 1em;
  color: "white";
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 3s;
  border-radius: 50%;
  background: black;

  &:after {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    border: 1px solid white;

    box-shadow: 0 0 18pt 2pt blue, 0 0 0pt 2pt blue inset;
    transition: transform 4s;
  }

  &:before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    box-shadow: 0 0 18pt 2pt red, 0 0 0pt 2pt red inset;
    transition: transform 4s;
  }

  &:hover {
    &:before {
      transform: scale(1.1);
    }
    &:after {
      transform: scale(1.3);
    }
  }
`

const BackButton = styled(Button)`
  --icon-color: black;
  --icon-pos-top: 25%;

  position: fixed;
  z-index: 9999;
  width: 65px;
  height: 65px;
  bottom: 0;
  left: 50%;
  transform: translateY(0%) translateX(-50%);
  transition: transform opacity 1s 5s;
  opacity: ${({ isActive }) => (isActive ? 1 : 0)};
  font-family: "Monoton", cursive !important;
  max-width: 100px;
  align-items: center;
  background: rgba(255, 15, 0, 0.79);
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  backdrop-filter: blut(5px);

  &:before {
    content: "";
    border-radius: 3px;
    width: 0.2em;
    height: 2em;
    background: var(--icon-color);
    position: absolute;
    left: 50%;
    top: var(--icon-pos-top);
    transform: rotate(45deg) translate(0, 0%);
  }
  &:after {
    content: "";
    left: 50%;
    border-radius: 3px;
    background: var(--icon-color);
    width: 0.2em;
    height: 2em;
    top: var(--icon-pos-top);
    background: black;
    position: absolute;
    transform: rotate(-45deg) translate(0, 0%);
    /* transform: translateY(-1em) translateX(0em); */
  }

  &:hover {
    /* &:after {
      transform: translateY(-1em) translateX(0em);
    }

    &:before {
      transform: translateY(1em) translateX(0em);
    } */
  }
`

const SlantView = styled(Container)`
  will-change: transform;
  transition: transform 1.2s 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
  z-index: 1;

  ${({ isActive, side }) =>
    isActive
      ? css`
          transform: translateX(${side === "left" ? "0%" : "0%"});
        `
      : css`
          transform: translateX(${side === "left" ? "-100%" : "100%"});
        `}
  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${animation_slowFadeIn} 4s forwards;
  }
`

const Content = ({
  data: { discription, poster, title, gitLink, link, type },
  stackObj,
  props,
  isActive,
  inAnimation,
  setView,
}) => {
  const [isSubmit, setSubmit] = useState(false)
  const [showModle, toggleModle] = useState(false)

  const desktopAnim = [`translateX(0%)  `, `translateX(40%) `]

  const backgroundSlide = useSpring({
    from: {
      transform: desktopAnim[0],
    },
    to: {
      transform: desktopAnim[1],
    },
    config: { tension: 10, mass: 4 },
  })

  const slideCalcY = (val, pol) => `translateY(${val * pol}%)`
  const playVideo = (p, ref) => {
    if (p === poster && ref) {
      ref.setAttribute("playsinline", true)
      ref.play()
    }
  }

  const containerIndex = status => {
    return status ? 0 : 0
  }

  const DiscriptionText = styled(Text)``

  const PermissionForm = styled.form`
    color: white;
    display: flex;
    flex-direction: column;
    left: 1em;
    border-radius: 3px;
    overflow: hidden;

    input {
      background: transparent;
      color: white;
      border: 1px solid #ffffff5e;
      margin: 0.2em;
      font-size: 0.8em;
    }
    &:after {
      content: "Thank You";
      width: 100%;
      height: 100%;
      background: #00f951e8;
      position: absolute;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      color: black;
      transition: transform 1s linear;
      transform: ${({ isSubmit }) =>
        isSubmit ? "translateY(0%)" : "translateY(100%)"};
    }
  `

  const handleFormSubmit = e => {
    e.preventDefault()
    setSubmit(true)
  }

  return (
    <>
      {showModle && (
        <PermissionForm
          netlify-honeypot="bot-field"
          data-netlify="true"
          method="POST"
          p="1em"
          name="Project_Permission"
          onSubmit={handleFormSubmit}
          isSubmit={isSubmit}
        >
          <Text
            m="0.2em"
            p="0.2em"
            lineHeight=".9em"
            fontSize=".8em"
            color="#ffffff5e"
            textAlign={["center", "initial"]}
            style={{ borderBottom: "1px solid #ffffff5e" }}
          >
            This project requires login credentials; please submit a request for
            access.
          </Text>
          <input placeholder="Reason" name="message" type="text" />
          <input placeholder="email" name="email" type="email" />
          <input placeholder="email" type="submit" />
        </PermissionForm>
      )}
      <Container
        animate
        flexDirection={["column", "row"]}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100%",
          width: "100%",
          willChange: "transform ",
          display: "flex",
          zIndex: containerIndex(isActive),
          transform: inAnimation.slide.interpolate(e => slideCalcY(e, -1)),
        }}
        type="Flex"
        flexBasis="100%"
      >
        <SlantView
          side="left"
          isActive={isActive}
          style={{
            width: "100%",
            height: "100%",
            overflow: "hidden",
            background: "beige",
            position: "relative",
          }}
        >
          {ProjectData.map((d, i) => (
            <Container
              key={i}
              as="video"
              animate
              className="prjImg"
              ref={ref => playVideo(d.poster, ref)}
              left={["0%", "-50%"]}
              style={{
                position: "absolute",
                background: `url(${poster})`,
                backgroundSize: "cover",
                top: "0",
                height: "100%",
                opacity: d.poster === poster ? 1 : 0,
              }}
            >
              <source src={d.video} type="video/mp4" />
            </Container>
          ))}
        </SlantView>

        <SlantView
          isActive={isActive}
          style={{
            width: "100%",
            height: "100%",

            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></SlantView>
      </Container>
      <BackButton
        isActive={isActive}
        onClick={() => {
          setSubmit(false)
          setView(false)
        }}
      />
      <Heading
        width={["inherit"]}
        fontSize={["9vh"]}
        fontWeight="900"
        textAlign={["left", "center"]}
        style={{
          whiteSpace: "nowrap",
          boxShadow: "0px 5px 8px 3px #00000073",
          display: "flex",
          transition: "opacity 1s .3s , transform 1s ",
          opacity: isActive ? 1 : 0,
          transform: isActive ? "translateY(0%)" : "translateY(-90vh)",
          color: "black",
          background: "rgba(126, 124, 127, 0.47)",
          position: "fixed",
          left: 0,
          top: 0,
          willChange: "transform opacity",
          "border-bottom-right-radius": "12px",
          backdropFilter: "blur(5px)",
        }}
        fontWeight="900"
        px="1em"
        py=".1em"
      >
        {title}
      </Heading>

      <animated.div
        style={{
          willChange: "transform opacity",
          position: "fixed",
          zIndex: 0,
          right: 0,
          bottom: 0,
          height: "100%",
          width: "50%",
          display: "flex",
          flexDirection: "column",
          background: "black",
          opacity: props.opacity.interpolate(e => e),
          transform: inAnimation.slide.interpolate(e => slideCalcY(e, 1)),
        }}
      >
        <Container
          type="Flex"
          p={["0em", "1em"]}
          alignItems="center"
          flexDirection="column"
          justifyContent="flex-end"
          alignItems="center"
          style={{
            paddingTop: "20%",
            position: "relative",
            flexBasis: "100%",
            zIndex: 0,
            position: "absoulte",
            top: "50%",
          }}
        >
          <DiscriptionText
            maxWidth={["", "30%"]}
            m={["1em", ""]}
            style={{
              position: "relative",
              letterSpacing: -1,
              transition: "opacity 1s .4s",
              opacity: isActive ? 1 : 0,
              borderRadius: "4px",
              height: "100%",
              maxWidth: "350px",
              fontSize: ".9em",
            }}
            p="1em"
            bg="rgba(126, 124, 127, 0.47)"
            color="#ffffff7a"
          >
            <h2
              style={{
                paddingBottom: "1em",
                color: "white",
                borderBottom: "1px solid #ffffff7a",
              }}
            >
              Purpose
            </h2>

            {type === "auth" && (
              <FiLock
                style={{
                  color: "red",
                  position: "absolute",
                  top: "10px",
                  right: "30px",
                }}
              />
            )}
            <FiBookmark
              style={{
                color: "red",
                position: "absolute",
                top: "10px",
                right: "10px",
              }}
            />
            {discription}
          </DiscriptionText>

          <a href={link}>
            <CircleButton
              style={{
                transition: "opacity 1s .2s",
                opacity: isActive ? 1 : 0,
              }}
              text={type === "auth" ? FiLock() : FiGlobe()}
            />
          </a>
          <Icon
            style={{
              transition: "opacity 1s .1s",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isActive ? 1 : 0,
            }}
            className="hoverGrow"
            github={gitLink}
            color="beige"
          />
          <Icon
            color="beige"
            style={{
              transition: "opacity 1s ",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              opacity: isActive ? 1 : 0,
            }}
            {...stackObj}
          />
        </Container>
      </animated.div>
    </>
  )
}

const ViewerComponent = ({ inAnimation, data, isActive, setView }) => {
  const transitions = useTransition(data, null, {
    from: { opacity: 0, slideY: [60], slideX: [30] },
    enter: { opacity: 1, slideY: [0], slideX: [0] },
    leave: { opacity: 0, slideY: [-60], slideX: [-30] },
    config: { mass: 1, tension: 210, friction: 20 },
  })
  return (
    <>
      {transitions.map(({ key, props }) => {
        const { stack = [] } = data

        const stackObj = stack.reduce((acc, val) => {
          Object.assign(acc, { [val]: val })
          return acc
        }, {})

        return (
          <Content
            key={key}
            setView={setView}
            inAnimation={inAnimation}
            key={key}
            stackObj={stackObj}
            props={props}
            data={data}
            isActive={isActive}
          />
        )
      })}
    </>
  )
}

export const Viewer = () => {
  const [view, setView] = useCustom()
  const [enterView, setEnter] = useState()
  const [pRef, setRef] = useState()

  useEffect(() => {
    if (Object.entries(view).length > 0) {
      setEnter(true)
    } else {
      setEnter(false)
    }

    if (view.ref) {
      setRef(pRef)
    }
  }, [view])

  useEffect(() => {
    if (enterView) {
      set({ slide: [0], opacity: [1] })
      document.body.style.overflow = "hidden"
      stop()
    } else {
      document.body.style.overflow = "scroll"
      const icon = view.ref
      if (icon) {
        if (icon.current) {
          icon.current.style.transition = "opacity .7s"
          icon.current.style.opacity = 0
        }
      }
      set({
        slide: [100],
        opacity: [0],
      })
    }

    return () => {
      document.body.style.overflow = "scroll"
    }
  }, [enterView])

  const [animation, set, stop] = useSpring(() => ({
    pRef: [2],
    slide: [100],
    opacity: [0],
    onRest: ({ opacity }) => {
      if (opacity[0] === 0) {
        const el = document.querySelector(".projectContainer")
        el.style.opacity = 1
        setView({})
      }
    },
  }))

  return (
    <ViewerComponent
      setView={setEnter}
      isActive={enterView}
      inAnimation={animation}
      data={view}
    />
  )
}
