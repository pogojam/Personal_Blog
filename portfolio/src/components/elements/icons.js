import React from "react"
import { Box } from "rebass"
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from "react-icons/io"
import Container from "../container"
import {
  DiDocker,
  DiJavascript1,
  DiLinux,
  DiDatabase,
  DiNpm,
  DiReact,
  DiApple,
} from "react-icons/di"

const link = (path, component) => (
  <a style={{ color: "initial" }} href={path}>
    {component}
  </a>
)

export const Icon = ({
  size = "1em",
  facebook,
  github,
  linkedin,
  docker,
  linux,
  react,
  javascript,
  npm,
  apple,
  database,
  ...props
}) => {
  return (
    <Container {...props}>
      {facebook &&
        link(
          facebook,
          <IoLogoFacebook href={facebook} size={size} {...props} />
        )}
      {github && link(github, <IoLogoGithub size={size} {...props} />)}
      {linkedin && link(linkedin, <IoLogoLinkedin size={size} {...props} />)}
      {docker && <DiDocker size={size} {...props} />}
      {linux && <DiLinux size={size} />}
      {database && <DiDatabase size={size} />}
      {javascript && <DiJavascript1 size={size} />}
      {npm && <DiNpm size={size} />}
      {react && <DiReact size={size} />}
      {apple && <DiApple size={size} />}
    </Container>
  )
}
