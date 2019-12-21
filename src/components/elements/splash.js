import React, { useEffect } from "react"
import styled, { keyframes } from "styled-components"
import { useSpring, animated } from "react-spring"
import { Box } from "rebass"
import LogoSvg from "../../static/images/whiteLogo.svg"

const Splash = ({ state }) => {
  const [inAnim, setAnim] = useSpring(() => ({
    xy: [0, -100],
  }))

  const BackDrop = animated(styled(Box)`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999999;
  `)

  useEffect(() => {
    if (state === "active") {
      setAnim({
        xy: [0, 450],
      })
    } else {
      setAnim({
        xy: [0, 150],
      })
    }

    // setTimeout(
    //   () =>
    //     setAnim({
    //       xy: [0, 100],
    //     }),
    //   2000
    // )
  }, [state])

  const flashAnim = keyframes`
    0%{
      opacity:0;
      /* transform: translate(-30vw,-10%); */
      
    }


    100%{
      opacity:1;
      /* transform:translate(0vw,-30%); */
    }
  
  `

  const LoadedImage = styled(Box)`
    position: relative;
    animation: ${flashAnim} 3s cubic-bezier(0.075, 0.82, 0.165, 1) forwards;
    width: 5em;
    height: 5em;
    background: url(${LogoSvg}) center;
    background-size: cover;
    will-change: transform;
  `

  return (
    <BackDrop
      bg="#171010"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "25vh",
        width: "100%",
        transform: inAnim.xy.interpolate((e, b) => `translate(${e}%,${b}%)`),
      }}
    >
      <Box>
        <LoadedImage style={{ inAnim }} src={LogoSvg} />
        {/* <animated.div
          style={{
            position: "absolute",
            background: "red",
            width: "100%",
            height: "100%",
          }}
        ></animated.div> */}
      </Box>
    </BackDrop>
  )
}

export default Splash
