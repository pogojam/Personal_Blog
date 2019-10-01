import React from "react"
import { Box } from "rebass"
import { IoLogoFacebook, IoLogoGithub, IoLogoLinkedin } from "react-icons/io"

export const Social = ({
  size = "1em",
  facebook,
  github,
  linkedin,
  ...props
}) => {
  return (
    <Box {...props}>
      {facebook && <IoLogoFacebook size={size} />}
      {github && <IoLogoGithub size={size} />}
      {linkedin && <IoLogoLinkedin size={size} />}
    </Box>
  )
}
