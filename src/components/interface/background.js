import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import chance from "chance"
import styled from "styled-components"
import { getDistance, getRandomInt } from "../util"
import * as THREE from "three"
import { scrollState } from "../atoms/atoms"
import { useSpring } from "react-spring"
import { useScroll, useWheel } from "react-use-gesture"
import { LogContext } from "twilio/lib/rest/serverless/v1/service/environment/log"
import { useRecoilState } from "recoil"
function CanvasBackground() {
  const scene = new THREE.Scene()
  // Camera
  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  camera.position.z = 20

  // Renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setClearColor(0x000000, 1)
  renderer.setSize(window.innerWidth, window.innerHeight * 1.5)

  const canvas = renderer.domElement
  canvas.classList = "BackgroundCanvas"

  canvas.style.display = "block"
  canvas.style.zIndex = -1
  canvas.style.top = 0
  canvas.style.left = 0
  canvas.style.backfaceVisibility = "none"
  canvas.style.willChange = "transform"

  document.getElementById("BackgroundCanvas").appendChild(canvas)

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  const operator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
  }

  this.scrollEvent = directions => {
    directions.forEach(({ side, polarity, velocity }) => {
      const cameraSide = camera.rotation[side]
      camera.rotation[side] = operator[polarity](
        camera.rotation[side],
        velocity
      )
    })

    // camera.rotation.y += 0.001
    // camera.rotation.x -= 0.001
  }
  this.setCamera = ([x, y, z]) => {
    camera.rotation.x = x
    camera.rotation.y = y
    camera.rotation.z = z
  }

  // Add to scean
  const SceanStars = new Stars(scene, 6000)

  const update = () => {
    // this.scrollEvent()
    renderer.render(scene, camera)
    // SceanStars.animate()

    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

// Mesh Objects

function Stars(scean, count) {
  const starGeo = new THREE.Geometry()
  const sprite = new THREE.TextureLoader().load(
    "https://res.cloudinary.com/dxjse9tsv/image/upload/v1590557472/General_Icons/Oval_White_BlackBackground.png"
  )
  const starMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.7,
    map: sprite,
  })
  // Animations vals

  const stars = new THREE.Points(starGeo, starMaterial)

  for (let i = 0; i < count; i++) {
    const vector = new THREE.Vector3(
      getRandomInt(-300, 600),
      getRandomInt(-300, 600),
      getRandomInt(-300, 600)
    )
    vector.velocity = 0.3
    vector.acceleration = 0.005
    starGeo.vertices.push(vector)
  }

  this.animate = () => {
    starGeo.vertices.forEach(vert => {
      vert.velocity += vert.acceleration
      vert.y -= vert.velocity

      if (vert.y < -400) {
        vert.y = 200
        vert.velocity = 0
      }
    })

    starGeo.verticesNeedUpdate = true
  }

  scean.add(stars)
}

const BackgroundDirections = {
  downRight: v => [
    { polarity: "-", side: "y", velocity: v[0] * 0.001 },
    { polarity: "+", side: "x", velocity: v[1] * 0.001 },
  ],
  downLeft: v => [
    { polarity: "-", side: "y", velocity: v[0] * 0.001 },
    { polarity: "-", side: "x", velocity: v[1] * 0.001 },
  ],
  upLeft: v => [
    { polarity: "+", side: "y", velocity: v[0] * 0.001 },
    { polarity: "-", side: "x", velocity: v[1] * 0.001 },
  ],
  upRight: v => [
    { polarity: "+", side: "y", velocity: v[0] * 0.001 },
    { polarity: "+", side: "x", velocity: v[1] * 0.001 },
  ],
}

const Scroller = ({ Canvas }) => {
  const [anim, setAnim] = useSpring(() => ({
    z: 1,
    x: 1,
    y: 1,
    onFrame: frame => {
      const vals = BackgroundDirections["downRight"]([
        frame.velocity,
        frame.velocity,
      ])
      console.log(genPaths(60, 5))

      // genPaths(60, 5)
      // Canvas.scrollEvent(genPaths(60, 5))
      // Canvas.setCamera([frame.x, frame.y, frame.z])
    },
    // config: { mass: 1, tension: 510, friction: 1000 },
  }))

  const Chance = chance()

  const genPaths = (length, seqLength) => {
    const lengthArray = [...Array(length)]

    return lengthArray.map((_, i) => {
      const dex = Chance.integer({ min: 0, max: 3 })
      return BackgroundDirections[dex]
    })
  }
  const bind = useScroll(
    e => {
      console.log({
        z: e.velocity,
        x: e.xy[1] + Chance.integer({ min: 0, max: 10 }),
        y: window.scrollY,
      })
      setAnim({
        z: e.velocity,
        x: e.xy[1] + Chance.integer({ min: 0, max: 10 }),
        y: window.scrollY,
      })
      // setPort()
    },
    { domTarget: window }
  )
  useEffect(bind, [bind])

  return (
    <div
      style={{ height: "100%", width: "100%", position: "absolute", top: 0 }}
    />
  )
}

const Background = () => {
  const [state, setBg] = useRecoilState(scrollState)
  // Check if canvas is already rendered

  useEffect(() => {
    const background = new CanvasBackground()
    setBg(background)
  }, [])

  return <div>{state && <Scroller Canvas={state} />}</div>
}

export default Background
