import React, { useRef, useEffect, useState, useLayoutEffect } from "react"
import styled from "styled-components"
import { getDistance, getRandomInt } from "../util"
import * as THREE from "three"
import { useScroll } from "react-use-gesture"

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
  const renderer = new THREE.WebGLRenderer({ antialias: true })
  renderer.setClearColor("white")
  renderer.setSize(window.innerWidth, window.innerHeight)

  const canvas = renderer.domElement
  canvas.classList = "BackgroundCanvas"
  canvas.style.position = "fixed"
  canvas.style.display = "block"
  canvas.style.zIndex = -1
  canvas.style.top = 0
  canvas.style.left = 0
  canvas.style.backfaceVisibility = "none"
  canvas.style.willChange = "transform"

  document.body.appendChild(canvas)

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
  })

  this.scrollEvent = () => {
    camera.rotation.y += 0.001
    camera.rotation.x -= 0.001
  }

  // Add to scean
  const SceanStars = new Stars(scene, 6000)

  const update = () => {
    this.scrollEvent()
    renderer.render(scene, camera)
    SceanStars.animate()

    requestAnimationFrame(update)
  }
  requestAnimationFrame(update)
}

// Mesh Objects

function Stars(scean, count) {
  const starGeo = new THREE.Geometry()
  const sprite = new THREE.TextureLoader().load(
    "https://res.cloudinary.com/dxjse9tsv/image/upload/v1574805294/General_Icons/Oval.png"
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

const Background = () => {
  const [bg, setBg] = useState(null)

  // Check if canvas is already rendered

  useEffect(() => {
    if (!document.querySelector(".BackgroundCanvas")) {
      const background = new CanvasBackground()
      setBg(background)
    }
  }, [])

  return <div style={{ display: "none" }} />
}

export default Background
